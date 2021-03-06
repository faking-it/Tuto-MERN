// const mongoose = require("mongoose");

// const TreeSchema = new mongoose.Schema({
//     arbotag: {
//         type: Number,
//         required: true,
//     },
//     geoloc: {
//         lat: {
//             type: Number,
//             required: true,
//         },
//         lon: {
//             type: Number,
//             required: true,
//         },
//     },
//     hauteur_totale: {
//         type: Number,
//         required: true,
//     },
//     diametre_cime: {
//         type: Number,
//         required: true,
//     },
//     leaves: {
//         type: Number,
//     },
// });

// module.exports = Tree = mongoose.model("trees", TreeSchema);

const mongoose = require("mongoose");

const TreeSchema = new mongoose.Schema({
  arbotag: {
    type: String,
    required: true,
  },
  geoloc: {
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  hauteur_totale: {
    type: Number,
    required: true,
  },
  diametre_cime: {
    type: Number,
    required: true,
  },
  leaves: {
    type: Number,
  },
  owner: {
    type: String,
  },
  lock: {
    type: Boolean,
  },
  color: {
    type: String,
  },
});

module.exports = Tree = mongoose.model("trees", TreeSchema);
