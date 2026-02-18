import mongoose from 'mongoose';

export const healthCheck = async (req, res) => {
    const health = {
        uptime: process.uptime(),
        timestamp: Date.now(),
        status: "ok",
        database: "unknown",
    };

    try {
        const dbState = mongoose.connection.readyState;

        if(dbState === 1) {
            health.databse = "Connected";
        } else {
            health.database = "Disconnected";
            health.status = "error";
            return res.status(503).json(health);
        }
    } catch (error) {
        health.status = "Error";
        health.database = "Error";
        res.status(500).json(health);
    }
};