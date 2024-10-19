import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const generateAccessToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken();
        return { accessToken }
    } catch (error) {
        throw new ApiError(500, `Something went wrong while generating access token`)
    }
}

const registerUser = asyncHandler(async(req, resp) => {
    const { username, email, password } = req.body;

    if (
        [username, email, password].some((fields) => fields.trim() === "")
    ) {
        throw new ApiError(400, `All fields are required`)
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, `user with email and password already exists`)
    }

    const user = await User.create({
        username,
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select(
        "--password"
    )

    return resp.status(201).json(
        new ApiResponse(200, createdUser, `User Register Successfully`)
    )
})


const loginUser = asyncHandler(async(req, resp) => {
    const { username, password } = req.body;

    if (!username) {
        throw new ApiError(400, `Username is required`)
    }

    const user = await User.findOne({ username })

    if (!user) {
        throw new ApiError(400, `User does not exist`)
    }

    const isPasswordCheck = await user.isPasswordCorrect(password)

    if (!isPasswordCheck) {
        throw new ApiError(401, `Invalid Password`)
    }

    const { accessToken } = await generateAccessToken(user._id)

    const loggedInUser = await User.findById(user._id).select(" --password")

    return resp
        .status(200)
        .json(
            new ApiResponse(
                200, {
                    user: loggedInUser,
                    access_token: accessToken
                },
                `User logged in successfully`
            )
        )
})

export {
    registerUser,
    loginUser
}