---
title: "Why I hate Go"
description: "What makes a great programming language"
pubDate: 'Jul 9 2024'
tags: ['opinion', 'tech']
---

Hate is a strong word. I've worked with large projects with Go, and I'm comfortable writing it. But while we've managed to coexist, I've taken issue at some of Go's features and syntax, which I think are misguided at best and outright harmful at worst.

Golang is meant to be a fast, low-level language alternative to C and C++, with strong types and language features that make it more difficult to use than Python and Javascript, but much more efficient. For this reason, I'm going to be comparing it to its current biggest competitor: Rust. While slightly easier to use than Rust, Go has issues that make it clunky, slower, and unsafe. I outline some of these problems below, in increasing order of egregiousness


## Issue 1 - Capitalization as syntax

One of Go's more opinionated features is its use of case syntax, specifically for public/private declarations. When you declare a variable or function in Go, it is exported from the module if it starts with a capital letter, and is private if it starts with a lowercase letter.

```go
package myexample

// If the type starts with a capital letter, it is accessible in other packages as myexample.PublicType
type PublicType {
    privateMethod string
    PublicMethod string
}

// If the type starts with a lowercase letter, it is only accessible in the current package
type privateType {}
```

Go admirers tout this as a great feature, allowing them to quickly tell whether a method or type is public or private in their module. However, this is a tradeoff that is almost objectively detrimental.

There are two cases: 
1. Reading code in the current package, and 
2. Reading code in other packages. 

When you're in the current package, the visibility of your variables is close to irrelavent. When you are writing code within a package, it doesn't matter which fields you can access elsewhere. You define it once in your interface so you can quickly see what you can use elswehere, and use your methods however you'd like in the current package. 

When you're in another package, it doesn't matter anyway, since anything you reference must be public!

Likely, Go here was trying to fix a common issue that occurs in object oriented programming, where state is commonly modified without a clear source, via bad references and function calls (effectively turning your entire codebase into a big global variable). However, in my experience this is isn't an error worth allocating significant language features to, as clear structured code will always circumvent this; and no matter what language you're using, it is always possible to write bad code. 

## Issue 2 - What's a warning?

The following Go code doesn't compile

```go
package myexample

import "fmt"

func main() {
    x := "My variable"

    // fmt.Println(x)
    fmt.Println("Hello world")
}
```

Obviously, it's not ideal to have a ton of leftover debug variables and import statements all over your codebase, but this is what warnings are for! There is no reason that the above code should not even be able to *compile*. This only works to slow down developers for no reason, when debugging I am constantly adding and removing variables and statements, so needing to find all unused variables every time I compile is almost as bad as C or PHP semicolons

## Issue 3 - Types

We finally arrive at the worst part of working with Go, and the reason I'm making this post in the first place. Compared to Rust, Go's type system is abysmal. Without typed generics, inheritance, or even sum types, Go's type system only gets in the way of development and FORCES you to create invalid state. Compare Go and Rust, the following is terrible practice in Rust:

```rust
// BAD! This function always returns invalid state
fn divide_six_by(n: u32) -> (u32, &'static str) {
    if n == 0 {
        return (0, "Cannot divide by zero")
    }
    if n == 4 || n == 5 || n > 6 {
        return (0, "Division would result in non integer value")
    }
    return (6 / n, "")
}


fn main() {
    // Now we have to do this clunky parsing
    let (result, err) = divide_six_by(3);
    if err != "" {
        return eprintln!("{}", err)
    }
    
    println!("{}", result);
}

```

The reason this is considered terrible practice is because it creates invalid state, and in Rust we strive to [make invalid state unrepresentable](https://geeklaunch.io/blog/make-invalid-states-unrepresentable/). Here, we're doing the opposite! No matter what the result of divide_twelve_by is, we're going to end up with some invalid state. Either `result` is going to incorrectly be zero (and we have to be sure to check the error), or `err` is going to be an empty string (which means that error exists, but is not a valid value). The correct way to represent this state is as follows

```rust
// GOOD! It is now impossible to return invalid state
fn divide_six_by(n: u32) -> Result<u32, &'static str> {
    if n == 0 {
        return Err("Cannot divide by zero")
    }
    if n == 4 || n == 5 || n > 6 {
        return Err("Division would result in non integer value")
    }
    return Ok(6 / n)
}

fn main() {
    // Rust will force us to check to make sure we don't miss any errors
    match divide_six_by(3) {
        Err(err) => eprintln!("{}", err),
        Ok(result) => println!("{}", result)
    }
}
```

Now let's look at Go, the following is "idiomatic" (except that idiomatic Go wants one-letter variable names, for some reason), and one of the ONLY ways to do error handling

```go
package main

import (
    "errors"
    "fmt"
)

// Because Go doesn't have sum types, you HAVE to return invalid state
func divide_six_by(n uint32) (uint32, error) {
    if n == 0 {
        return 0, errors.New("Cannot divide by zero")
    }
    if n == 4 || n == 5 || n > 6 {
        return 0, errors.New("Division would result in non-integer value")
    }
    return 6 / n, nil
}

func main() {
    // Its pretty clear which of the Rust examples this is analogous to
    result, err := divide_six_by(3)
    if err != nil {
        fmt.Printf("%v", err)
        return
    }
    fmt.Printf("%v", result)
}
```

This really, really hurts the safety of your programs. Every time a funciton can error, you have to be sure to check it (which is really verbose in Go, but that's another issue), and if you forget then your program will proceed to error on the invalid empty states it's been passed. 

---

Once again, I'll likely continue putting up with Go in established projects, but for any new projects I control I will avoid it like the plague. I am convinced that any diehard Go fans haven't seen or understood what having a language like Rust *work for you* is like. 
