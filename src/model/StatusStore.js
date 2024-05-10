import mongoose from "mongoose"

const statusStoreSchema = new mongoose.Schema({
    status: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false
});

const StatusStore = mongoose.model('StatusStore', statusStoreSchema, 'status_store');

export default StatusStore;