export default class UserModel{
    constructor(name, email, password, type){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    //Sign Up method
    static signUp(name, email, password, type){
        const newUser = new UserModel(name, email, password, type);
        newUser.id = users.length + 1;
        users.push(newUser);

        return newUser;
    }

    // Sign in method
    static signIn(email, password){
        const user = users.find((u) => u.email == email && u.password == password);
        return user;
    }

    static getAll(){
        return users;
    }
}

let users = [
    {
        id: 1,
        name: "Seller User",
        email: "seller@gmail.com",
        password: "password1",
        type: "seller",
    },
    {
        id: 2,
        name: "customer User",
        email: "customer@gmail.com",
        password: "password1",
        type: "seller",
    }
]