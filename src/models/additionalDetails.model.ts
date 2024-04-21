
import mongoose from 'mongoose';

const AdditionalDetailsSchema = new mongoose.Schema({
  fatherName: {
    type: String,
    required: true,
  },
  parentContact: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// const AdditionalDetails = mongoose.model('AdditionalDetails', AdditionalDetailsSchema);

const AdditionalDetails = mongoose.models.AdditionalDetails || mongoose.model('AdditionalDetails', AdditionalDetailsSchema);

export default AdditionalDetails;



