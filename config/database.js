// Mongoose modülünü içe aktarıyoruz
import mongoose from "mongoose";

// Veritabanına bağlanmak için db fonksiyonu tanımlıyoruz
const db = () => {
    // Mongoose ile MongoDB bağlantısı kuruyoruz
    mongoose.connect(process.env.MONGO_URI, {
        //useNewUrlParser: true, // Yeni URL çözümleyici kullanıyoruz
        //useUnifiedTopology: true, // Yeni bağlantı yöneticisini kullanıyoruz
    }).then(() => {
        // Eğer bağlantı başarılı olursa, konsola mesaj yazdırıyoruz
        console.log("Database connected");
    }).catch((err) => {
        // Eğer hata olursa, hata fırlatıp, hata mesajını logluyoruz
        throw new Error(err.message);
        console.log(err); // (Bu satır throw'dan sonra çalışmaz)
    });
}

// Fonksiyonu dışa aktarıyoruz
export default db;