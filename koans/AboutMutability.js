describe("About Mutability", function() {

  it("should expect object properties to be public and mutable", function () {
    var aPerson = {firstname: "John", lastname: "Smith" };
    aPerson.firstname = "Alan";

    expect(aPerson.firstname).toBe("Alan");
  });

  it("should understand that constructed properties are public and mutable", function () {
    function Person(firstname, lastname)
    {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    var aPerson = new Person ("John", "Smith");
    aPerson.firstname = "Alan";

    expect(aPerson.firstname).toBe("Alan");
  });

  it("should expect prototype properties to be public and mutable", function () {
    function Person(firstname, lastname)
    {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    Person.prototype.getFullName = function () {
      return this.firstname + " " + this.lastname;
    };

    var aPerson = new Person ("John", "Smith");
    expect(aPerson.getFullName()).toBe("John Smith");

    aPerson.getFullName = function () {
      return this.lastname + ", " + this.firstname;
    };

    expect(aPerson.getFullName()).toBe("Smith, John");
  });

  it("should know that variables inside a constructor and constructor args are private", function () {
    function Person(firstname, lastname)
    {
      var fullName = firstname + " " + lastname;

      this.getFirstName = function () { return firstname; };
      this.getLastName = function () { return lastname; };
      this.getFullName = function () { return fullName; };
    }
    var aPerson = new Person ("John", "Smith");

    aPerson.firstname = "Penny";
    aPerson.lastname = "Andrews";
    aPerson.fullName = "Penny Andrews";

    expect(aPerson.getFirstName()).toBe("John");
    expect(aPerson.getLastName()).toBe("Smith");
    expect(aPerson.getFullName()).toBe("John Smith");

    aPerson.getFullName = function () {
      return aPerson.lastname + ", " + aPerson.firstname;
    };

    expect(aPerson.getFullName()).toBe("Andrews, Penny");
  });

});


/*
The key here is the new operator; var aPerson = new Person ("John", "Smith") creates a new Person, passing in John and Smith as the names used by the Person function, and assigning the new instance of the function to the variable aPerson.

Note the var fullName = firstname + " " + lastname inside of the Person function. This takes whatever is passed through as the function parameter at the time the Person function is called. At this point, this.getFullName will be equal to John Smith.

When you run aPerson.firstname = "Penny" this only updates the new instance of the Person; it doesn't modify the original Person function. When you call aPerson.getFirstName(), the getFirstName() method returns what was originally set as firstname for Person (John), not what has been set for the new instance aPerson (Penny).

As such, the first time you call aPerson.getFullName(), the name is John Smith.

Your new function aPerson.getFullName = function () { } returns aPerson.lastname + ", " + aPerson.firstname. Unlike the previous function, this takes the last and first name from the new instance of Person (Penny Andrews).

As such, the second time you call aPerson.getFullName(), the name is Penny Andrews.

Hope this helps! :)
https://www.queryoverflow.gdn/query/when-does-aperson-firstname-and-aperson-lastname-actually-change-in-this-code-snippet-27_47762710.html
*/