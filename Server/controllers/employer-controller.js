import { createEmployer, findByEmployerEmail, employerDetails, updateEmployerDetails } from "../models/employer-model.js";
import bcrypt from "bcrypt";
import e from "cors";
import jwt from "jsonwebtoken";


// Employer Sign-up Function
export const SignUpEmployer = async(req, res) => {
    try {

        const {
            company_name,
            company_email,
            company_password
        } = req.body;

        // Check if the employer already exists
        const employer = await findByEmployerEmail(company_email);
        if (employer) {
            return res.status(400).json({ error: "Employer already exists", success: false });
        }

        // Hash the password before storing
        bcrypt.hash(company_password, 10, async(err, hash) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).json({ error: "Error processing password", success: false });
            }

            // Create a new employer
            const newEmployer = await createEmployer(company_name,
                company_email,
                hash);

            if (!newEmployer) {
                return res.status(500).json({ error: "Failed to create Employer", success: false });
            }

            return res.status(201).json({ message: "Employer created successfully", success: true });
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
export const loginEmployer = async(req, res) => {
    const { company_email, company_password } = req.body;

    try {
        // Checking if the employer exists
        const employer = await findByEmployerEmail(company_email);
        if (!employer) {
            return res.status(401).json({ error: "Invalid email or password", success: false });
        }

        // Comparing the password
        const isMatch = await bcrypt.compare(company_password, employer.employer_password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password", success: false });
        }

        // Creating a JWT token
        console.log("-------employer-id---------", employer.employer_id);
        const token = jwt.sign({ id: employer.employer_id }, process.env.JWT_SECRET, {
            expiresIn: "72h",
        });

        // Setting the token in the cookie
        res.cookie("authToken", token, { httpOnly: true });

        const fullEmployerData = await employerDetails(employer.employer_id);
        console.log("----------------------------------------------------------", fullEmployerData)

        return res.status(200).json({
            message: "Login successful",
            token,
            employer: fullEmployerData, // Returning full candidate details with related data
            success: true,
            // samesite:
        });


        // Sending a success response
        // return res.status(200).json({ message: "Login successful", token, employer, success: true });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
export const updateEmployer = async(req, res) => {
    try {
        const { id } = req.params;
        const employerData = req.body;
        // console.log("-----------------", employerData);
        const updatedEmployer = await updateEmployerDetails(id, employerData);


        if (!updatedEmployer.success) {
            return res.status(500).json({ success: false, error: updatedEmployer.error });
        }

        return res.status(200).json({ updatedEmployer, success: true });
    } catch (error) {
        console.error("Error updating Employer profile:", error.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}