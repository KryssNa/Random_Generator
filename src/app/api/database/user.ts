// models/verification.ts
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const verificationSchema = new mongoose.Schema({
  qrCode: { 
    type: String, 
    required: true, 
    unique: true 
  },
  status: { 
    type: String, 
    required: true 
  },
  visaNumber: { 
    type: String, 
    required: true 
  },
  nationality: { 
    type: String, 
    required: true 
  },
  passportNumber: { 
    type: String, 
    required: true 
  },
  arabicName: { 
    type: String, 
    required: true 
  },
  latinName: { 
    type: String, 
    required: true 
  },
  expiryDate: { 
    type: Date, 
    required: true 
  }
}, {
  timestamps: true
});

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    default: 'ADMIN' 
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
    }
);

userSchema.methods.comparePassword = async function (password:any) {
    return bcrypt.compare(password, this.password);
}

export const Verification = mongoose.models.Verification || mongoose.model('Verification', verificationSchema);
export const User = mongoose.models.User || mongoose.model('User', userSchema);