export default function pokemon_model(sequelize, DataTypes) {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le nom ne peut pas être vide.' },
        notNull: { msg: 'Le nom est une propriété requise.' }
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [0], msg: 'Les points de vie doivent être supérieurs ou égaux à 0.' },
        max: { args: [999], msg: 'Les points de vie doivent être inférieurs ou égaux à 999.' },
        isInt: { msg: 'Les points de vie doivent être un entier.' },
        notNull: { msg: 'Les points de vie sont une propriété requise.' }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [0], msg: 'Les points de dégâts doivent être supérieurs ou égaux à 0.' },
        max: { args: [99], msg: 'Les points de dégâts doivent être inférieurs ou égaux à 99.' },
        isInt: { msg: 'Les points de dégâts doivent être un entier.' },
        notNull: { msg: 'Les points de dégâts sont une propriété requise.' }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: "L'image doit être une URL valide." },
        notNull: { msg: "L'image est une propriété requise." }
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const value = this.getDataValue('types')
        return value ? value.split(',') : []
      },
      set(types) {
        this.setDataValue('types', types.join())
      }
    }
  })
}