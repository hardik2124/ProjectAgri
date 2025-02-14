const mongoose = require("mongoose");

const AgroDetailsSchema = new mongoose.schema({
    businessName: {
        type: String,
        required: function () {
            return this.role === "business_owner";
        },
        trim: true,
    },
    registrationNumber: {
        type: String,
        required: function () {
            return this.role === "business_owner";
        },
    },
    taxIdentificationNumber: {
        type: String,
        required: function () {
            return this.role === "business_owner";
        },
    },
    industryType: {
        type: String,
        required: function () {
            return this.role === "business_owner";
        },
    },
    businessAddress: {
        street: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        zipCode: { type: String, required: false },
        country: { type: String, required: false },
    },
    establishedDate: {
        type: Date,
        required: false,
    },
    contactPerson: {
        name: { type: String, required: false },
        phone: { type: String, required: false },
        email: { type: String, required: false },
    },
});



module.exports = mongoose.model("AgroDetails", AgroDetailsSchema);
