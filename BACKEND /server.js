const app = require('./app');
const connectDB = require('./src/config/db');

const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}.`);
        });
    } catch (error) {
        console.error("Failed to start the server due to an error:", error);
        process.exit(1); 
    }
};
startServer();
