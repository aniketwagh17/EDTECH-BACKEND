module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        first_name: { type: String, default: null },
        last_name: { type: String, default: null },
        email: { type: String, unique: true },
        password: { type: String },
        token: { type: String },
      },
      { timestamps: true }
    );
  
    const user = mongoose.model("user", schema);
    return user;
  };