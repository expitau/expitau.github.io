---
title: "Abstraction isn't everything"
description: "When object-oriented programming fails"
pubDate: 'Jun 26 2024'
tags: ['opinion']
---

I've worked on a number of codebases, some cleaner than others, but a common problem I've noted with many has been the overuse of abstraction. While undoubtedly an indispensible tool, and the basis for modern computing, many developers tend to reach for it too frequently.

Obviously, you want to use abstraction where it's warranted. Copying-and-pasting code across your project creates significant technical debt and makes it difficult to make changes across your code base. However, it comes at the cost of no longer being able to see all of your logic at once. I like to think of reducing abstractions as the "Konmari" method of programming.

![Konmari method clothes](https://tidycasa.com/wp-content/uploads/2015/07/Getting-started-with-the-KonMari-Method.jpg)

> So what? I don't want to think all this complicated logic

Abstraction is a super helpful tool to think in terms of higher-order functions. It would be super annoying if I had to remember this stupid regular expression.

```js
function validateEmail(email) {
  return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);
}
```

However, writing your logic explicitly can make things dramatically clearer for the reader. Take this real-world example from an API I worked on.

```js
import {
    hashPassword
} from '../../utilities/password-handler.js';

/**
 * The UserService class provides methods for user-related operations.
 *
 * @class UserService
 * @constructor
 * @param {Object} fastify - The Fastify instance.
 */
export class UserService {
    constructor (fastify) {
        this.fastify = fastify;
        this.fastify.pg.connect()
    }

    /**
   * Registers a new user with the provided username and password.
   *
   * @param {string} username - The username of the new user.
   * @param {string} password - The password of the new user.
   * @returns {Promise<Object>} A Promise that resolves with the registered user data.
   */
    registerUser = async (email, password) => {
        try {
            const checkEmail = await this.fastify.pg.query(
                'SELECT id FROM users WHERE email = $1',
                [email]
            );

            if (checkEmail.rows.length > 0) {
                return { error: 'Email already exists' };
            } else {

                const hashword = hashPassword(password)

                const userId = await this.fastify.pg.query(
                    'INSERT INTO users (email,hashword) VALUES ($1, $2) RETURNING id',
                    [email, hashword]
                );

                // Create a JWT token for the newly registered user
                const token = this.fastify.jwt.sign({
                    email, userId
                });

                return { token };
            }

        } catch {
            throw new Error('User registration failed');
        }
    }
}

/**
 * Controller for handling user related requests.
 * @extends BaseController
 */
export class UsersController extends BaseController {

    constructor (fastify) {
        super();
        this.userService = new UserService(fastify);
    }

    register = async (request, reply) => {
        try {
            const {
                email,
                password
            } = request.body;
            const userResult = await this.userService.registerUser(email, password);

            if (userResult.error) {
                reply.code(409).send(new Error(userResult.error))
            } else if(userResult.token) {

                const response = {
                    data: { token: user.token },
                    message: 'User registered successfully',
                    statusCode: 201
                };

                reply.code(201).send(response);
            }

        } catch (error) {
            const response = this.getErrorResponse(error);
            reply.code(response.statusCode).send(response);
        }
    }
}
```

How would you now call this, and implement it as an endpoint? I bet it's not entirely obvious, nor is it obvious what `userResult` is supposed to be. In fact, without Typescript, this code is less safe and more prone to errors, despite all the structure and checking. Let's compare it to an explicit, functional approach.

```js
import {
    hash_password
} from '../../utilities/password-handler.js';

export async function register(fastify, request, reply) {
    const {
        email,
        password
    } = request.body;

    // Get users with the given email
    const checkEmail = await fastify.pg.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
    );

    // If the user exists, return an error
    if (checkEmail.rows.length > 0)
        return reply.code(409).send(new Error("Email already exists"))

    // Hash the password, and insert the new user into the database
    const hashword = hash_password(password)

    const userId = await fastify.pg.query(
        'INSERT INTO users (email, hashword) VALUES ($1, $2) RETURNING id',
        [email, hashword]
    );

    // Create a JWT token for the newly registered user
    const token = fastify.jwt.sign({ email, userId });

    // Return the JWT token
    return reply.code(201).send({
        data: { token },
        message: 'User registered successfully',
        statusCode: 201
    })
}
```

The steps are clear, and you can read linearly down the code to see exactly what each piece does. You might also notice that it's significantly smaller than the boilerplate-heavy abstracted version. This actually does do all of the same logic as before, but because we've written it inline, a lot of redundancy and parsing can be removed. 

![Business logic diagram](https://user-images.githubusercontent.com/84288806/281155295-0afe5c1d-97fe-4e47-92b2-17fa83d15cbe.png)

This is quite the way to describe our business logic. It makes us feel smart, because we're solving complex problems. In fact, this is an excellent way to explain complex problems, it makes what we are trying to accomplish very clear.

The issue is that this is not actually a complex problem, object oriented code has just made it seem this way. (In fact, the above diagram doesn't even include transformers logic, which will be used to handle requests and responses -- the complexity continues!).

> "Ah" 

I hear you chuckling to yourself 

> "Good example, but this will never scale to a full project! Surely the large file sizes will be an issue, and mixing logic like that will definitely cause issues down the road"

Maybe, maybe not. The beautiful thing about functional programming is that refactoring is *trivial*. Want to extract logic into its own function? Extract a function back to inline? Split into multiple files or condense into a single file? Ctrl+C Ctrl+V.

Also, don't be scared of large files! It's okay if you have to use your scroll wheel, and good IDEs have multi-panel editing for a reason. It is much, much more developer load to need go on a scavenger hunt to find all the missing code pieces every time they want to change some logic. **Just because your code is organized, does not mean it is productive**

> "Besides, this is oversimplified. The actual endpoint will have much more logic than that"

You would think, likely due to the added overhead that object oriented demands. However, any extra logic would likely only be a few lines, or an extra function call here or there. **The abstractions that object oriented provides DO NOT provide value to the product**. Their only purpose is to "make development easier", when in most situations they end up doing the opposite.

> "But I have a team that'll be working on this concurrently! I need to encapsulate everything!"

No you don't. Yes, your team is working concurrently, but more often than not they will be modifying business and response logic at the same time, so keep it in the same place! **Encapsulation only works when you actually have a seperation of concerns**, and then you can just put it into a function! :smile:

> "Fine, but surely there'll be repeated logic, after all I can't apply my design patterns anymore"

Design patterns were originally conceived as a hack to get around limitations of Java, and they haven't evolved much from there. If you have repeated logic, you can almost always implement it with a function, and functions make it far more obvious when your logic isn't *actually* repeated, or your abstraction is either too generic or to specific. 
