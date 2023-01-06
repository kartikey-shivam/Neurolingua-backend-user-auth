var mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      data: {
        type: String,
        required: true,
      },
      is_verified: {
        type: Boolean,
        default: false,
      },
    },
    language: {
      data: {
        type: String,
        required: true,
      },
      is_verified: {
        type: Boolean,
        default: false,
      },
    },
    course: {
      data: {
        type: String,
        required: true,
      },
      is_verified: {
        type: Boolean,
        default: false,
      },
    },
    program: {
      data: {
        type: String,
        required: true,
      },
      is_verified: {
        type: Boolean,
        default: false,
      },
    },
    price: {
      data: {
        type: Number,
        required: true,
      },
      is_verified: {
        type: Boolean,
        default: false,
      },
    },
    price1: {
      data: {
        type: Number,
        required: false,
      },
      is_verified: {
        type: Boolean,
        default: false,
      },
    },
    price2: {
      data: {
        type: Number,
        required: false,
      },
      is_verified: {
        type: Boolean,
        default: false,
      },
    },
    coupons: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Coupon',
      },
    ],
    description: {
      data: {
        type: String,
        required: true,
      },
      is_verified: {
        type: Boolean,
        default: false,
      },
    },
    reviews: {
      type: Schema.Types.ObjectId,
      ref: 'Reviews',
    },
    courseImage: {
      data: {
        type: String,
        required: true,
      },
      is_verified: {
        type: Boolean,
        default: false,
      },
    },
    isVerified: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);
CourseSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, rec) => {
    delete rec._id;
  },
});

module.exports = mongoose.model('Course', CourseSchema, 'Course');
