import { connect } from 'mongoose';

export const connectDB = async () => {
    console.log('Base de datos conectada');
    return await connect('mongodb+srv://quimeymoreno00:WPpvuyXGegmP4UBV@cluster0.zzm2z.mongodb.net/ProyectoFinal?retryWrites=true&w=majority&appName=Cluster0');
}
