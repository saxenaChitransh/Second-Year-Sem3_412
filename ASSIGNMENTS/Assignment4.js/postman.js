import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let users = [
    {
        id: 101,
        name: "Abc",
        email: "abc@gmail.com"
    }
];

// GET
app.get("/users", (req, res) => {
    res.status(200).json({
        message: "Data received",
        users: users
    });
});

// POST
app.post("/users", (req, res) => {

    const { id, name, email } = req.body;

    const newUser = {
        id: Number(id),
        name: name,
        email: email
    };

    users.push(newUser);

    console.log("New User:", newUser);

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});

// PUT
app.put("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const { name, email } = req.body;

    users[index] = {
        id: id,
        name: name,
        email: email
    };

    res.status(200).json({
        message: "User updated successfully",
        user: users[index]
    });
});

// DELETE
app.delete("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const deletedUser = users.splice(index, 1);

    res.status(200).json({
        message: "User deleted successfully",
        user: deletedUser[0]
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});