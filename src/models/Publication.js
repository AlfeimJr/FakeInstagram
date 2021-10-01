module.exports = (conection, DataTypes) => {
    const Publication = conection.define('Publication', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING(200),
        },
        image: {
            type: DataTypes.STRING(200),
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
          create_at: {
            type: DataTypes.DATE,
        },
    
    },
    { 
        tableName: "publications",
        timestamps: false,
    },
    )
    
    //relacionamento entre usuario e publicação 
    Publication.associate = (models) => {
        Publication.belongsTo(models.User, {
            foreignKey: 'user_id'
        })     
    }    
    return Publication;
    //////////////////////////////////////////////
};