const User=require('../models/User');
const JWT=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

//register user
 const register=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const user=new User({name,email,password, role: role || 'user',});
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
        catch(err){
            res.status(400).json({ error: err.message });  // Corrected from 'error' to 'err'

        }
        ;

        
    }
    // Register a new admin user
    const registerAdmin = async (req, res) => {
        console.log(req.body); // Log the request body for debugging purposes
    
        const { name, email, password ,username} = req.body;
    
        try {
             // Check if the username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Check if the email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }
            const admin = new User({
                name,
                email,
                password,
                username,
                role: 'admin',
            });
    
            await admin.save();
            res.status(201).json({ message: 'Admin registered successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    
    const Login=async(req,res)=>{
        try{
            const{email,password,}=req.body;
            const user=await User.findOne({email})
            if (!user) return res.status(404).json({ error: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
        

        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ "Login Success": 'User logged in successfully', token });
       
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
        }

const Logout=async(req,res)=>{
    try{
        res.status(200).json({ "Logout Success": 'User logged out successfully',token: '' });
    
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}


    module.exports={register,Login,Logout,registerAdmin};

