import User from "../Model/user.model.js";
import bcrypt from 'bcrypt';
import genToken from "../utils/genToken.js";

const cookieOptions = {
    httpOnly: true,
}

export const registerUser = async (req, res) => {

    try {
        const { name, email, password, phone } = req.body
        if (!phone || !name || !password || !email) {
            return res.status(422).json({ message: 'All fields Required!' })
        }

        const emailExists = await User.findOne({ email })
        if (emailExists) {
            return res.status(400).json({ message: 'email already Exists' })
        }

        if (password.length <= 6) {
            return res.status(400).json({ message: 'Password length should be greater or Equal to 6' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashedPassword, phone })

        const token = genToken(newUser._id)
        res.cookie("token", token, cookieOptions)

        res.status(200).json(newUser);

    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

export const loginUser = async (req, res) => {
    // login the user

    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(422).json({ message: 'All fields Required!' })
        }


        const userExists = await User.findOne({ email })

        if (!userExists) {
            return res.status(404).json({ message: "User not Found" })
        }

        const correctPassword = bcrypt.compareSync(password, userExists.password)


        if (!correctPassword) {
            return res.status(401).json({ message: "Invalid Password" })
        }

        const token = genToken(userExists._id)
        res.cookie("token", token, cookieOptions)

        res.status(200).json({
            message: "Login Successfull",
            user: userExists,
        })
    } catch (error) {
        res.status(500).json({ message: "Intenal Server Error" }, error)
    }
}


export const getUser = (req, res) => {
     res.status(200).json({
            message: "get Successfull", user: req.user })
}

export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
    });

    return res.status(200).json({ message: "Logged out successfully" });
};