export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  bash: "5.2.0",
  "c++": "10.2.0",
  swift: "5.3.3",
  scala: "3.2.2",
  rust: "1.68.2",
  go: "1.16.2",
  php: "8.2.3",
};

export const GOOGLE_API_LOGIN = "https://www.googleapis.com/oauth2/v3/userinfo";

export const CODE_SNIPPETS = {
  javascript: `function greet(name) {
    console.log("Hello, " + name + "!");
  }
  
  greet("Alex");`,

  typescript: `type Params = {
    name: string;
  }
  
  function greet(data: Params) {
    console.log("Hello, " + data.name + "!");
  }
  
  greet({ name: "Alex" });`,

  python: `def greet(name):
    print("Hello, " + name + "!")
  
  greet("Alex")`,

  java: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Alex!");
    }
  }`,

  csharp: `using System;
  
  namespace HelloWorld
  {
      class Hello {
          static void Main(string[] args) {
              Console.WriteLine("Hello, Alex!");
          }
      }
  }`,

  bash: `#!/bin/bash
  name="Alex"
  echo "Hello, $name!"`,

  "c++": `#include <iostream>
  using namespace std;
  
  int main() {
      string name = "Alex";
      cout << "Hello, " << name << "!" << endl;
      return 0;
  }`,

  swift: `import Foundation
  
  let name = "Alex"
  print("Hello, \\(name)!")`,

  scala: `object HelloWorld {
    def main(args: Array[String]): Unit = {
        val name = "Alex"
        println(s"Hello, $name!")
    }
  }`,

  rust: `fn main() {
    let name = "Alex";
    println!("Hello, {}!", name);
  }`,

  go: `package main
  
  import "fmt"
  
  func main() {
      name := "Alex"
      fmt.Println("Hello, " + name + "!")
  }`,

  php: `<?php
  $name = 'Alex';
  echo "Hello, " . $name . "!";
  ?>`,
};
