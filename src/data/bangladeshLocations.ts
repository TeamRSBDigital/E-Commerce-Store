export interface DivisionData {
  id: string;
  name: string;
  districts: {
    name: string;
    isDhakaCity?: boolean;
    areas: string[];
  }[];
}

export const BANGLADESH_DIVISIONS: DivisionData[] = [
  {
    id: 'dhaka',
    name: 'Dhaka Division',
    districts: [
      {
        name: 'Dhaka City',
        isDhakaCity: true,
        areas: [
          'Dhanmondi', 'Gulshan 1', 'Gulshan 2', 'Banani', 'Uttara (Sector 1-14)',
          'Mirpur 1-14', 'Mohammadpur', 'Badda', 'Bashundhara R/A', 'Motijheel',
          'Khilgaon', 'Malibagh', 'Farmgate', 'Tejgaon', 'Paltan', 'Old Dhaka (Sadarghat)',
          'Lalbagh', 'Shantinagar', 'Rampura', 'Baridhara', 'Mohakhali'
        ]
      },
      {
        name: 'Gazipur',
        areas: ['Gazipur Sadar', 'Tongi', 'Joydebpur', 'Kaliakair', 'Sreepur', 'Kapasia']
      },
      {
        name: 'Narayanganj',
        areas: ['Narayanganj Sadar', 'Fatullah', 'Siddhirganj', 'Bandar', 'Araihazar', 'Sonargaon']
      },
      {
        name: 'Tangail',
        areas: ['Tangail Sadar', 'Mirzapur', 'Gopalpur', 'Madhupur', 'Ghatail']
      },
      {
        name: 'Narsingdi',
        areas: ['Narsingdi Sadar', 'Palash', 'Shibpur', 'Belabo', 'Raipura']
      },
      {
        name: 'Manikganj',
        areas: ['Manikganj Sadar', 'Singair', 'Saturia', 'Shivalaya']
      },
      {
        name: 'Faridpur',
        areas: ['Faridpur Sadar', 'Bhanga', 'Boalmari', 'Madhukhali']
      }
    ]
  },
  {
    id: 'chattogram',
    name: 'Chattogram Division',
    districts: [
      {
        name: 'Chattogram City',
        areas: ['Agrabad', 'GEC Circle', 'Nasirabad', 'Chawkbazar', 'Halishahar', 'Khulshi', 'Panchlaish', 'Kotwali', 'Patenga']
      },
      {
        name: 'Cox\'s Bazar',
        areas: ['Sadar', 'Teknaf', 'Ukhiya', 'Chakaria', 'Ramu']
      },
      {
        name: 'Cumilla',
        areas: ['Cumilla Adarsha Sadar', 'Kandirpar', 'Daudkandi', 'Laksam', 'Chandina']
      },
      {
        name: 'Noakhali',
        areas: ['Maijdee Sadar', 'Begumganj', 'Chowmuhani', 'Senbagh']
      },
      {
        name: 'Brahmanbaria',
        areas: ['Brahmanbaria Sadar', 'Ashuganj', 'Sarail', 'Kasba']
      }
    ]
  },
  {
    id: 'sylhet',
    name: 'Sylhet Division',
    districts: [
      {
        name: 'Sylhet City',
        areas: ['Zindabazar', 'Amberkhana', 'Shibganj', 'Uposhohor', 'Chouhatta', 'Pathantula']
      },
      {
        name: 'Moulvibazar',
        areas: ['Moulvibazar Sadar', 'Sreemangal', 'Kulaura']
      },
      {
        name: 'Habiganj',
        areas: ['Habiganj Sadar', 'Nabiganj', 'Madhabpur']
      },
      {
        name: 'Sunamganj',
        areas: ['Sunamganj Sadar', 'Chhatak', 'Jagannathpur']
      }
    ]
  },
  {
    id: 'rajshahi',
    name: 'Rajshahi Division',
    districts: [
      {
        name: 'Rajshahi City',
        areas: ['Shaheb Bazar', 'Motihar', 'Boalia', 'Rajpara', 'Kazla', 'Upashahar']
      },
      {
        name: 'Bogura',
        areas: ['Bogura Sadar', 'Sherpur', 'Shibganj', 'Dhunat']
      },
      {
        name: 'Pabna',
        areas: ['Pabna Sadar', 'Ishwardi', 'Santhia', 'Bera']
      },
      {
        name: 'Naogaon',
        areas: ['Naogaon Sadar', 'Patnitala', 'Manda']
      }
    ]
  },
  {
    id: 'khulna',
    name: 'Khulna Division',
    districts: [
      {
        name: 'Khulna City',
        areas: ['Shibbari', 'Daulatpur', 'Khalishpur', 'Sonadanga', 'Boyra', 'Rupsha']
      },
      {
        name: 'Jashore',
        areas: ['Jashore Sadar', 'Benapole', 'Keshabpur', 'Manirampur']
      },
      {
        name: 'Kushtia',
        areas: ['Kushtia Sadar', 'Kumarkhali', 'Bheramara']
      }
    ]
  },
  {
    id: 'barishal',
    name: 'Barishal Division',
    districts: [
      {
        name: 'Barishal City',
        areas: ['Sadar Road', 'Rupatali', 'Nathullabad', 'Natun Bazar', 'Kawnia']
      },
      {
        name: 'Patuakhali',
        areas: ['Patuakhali Sadar', 'Kuakata', 'Galachipa']
      }
    ]
  },
  {
    id: 'rangpur',
    name: 'Rangpur Division',
    districts: [
      {
        name: 'Rangpur City',
        areas: ['Jahaj Company More', 'Dhap', 'Lalbagh', 'Modern More', 'Medical More']
      },
      {
        name: 'Dinajpur',
        areas: ['Dinajpur Sadar', 'Birganj', 'Parbatipur']
      }
    ]
  },
  {
    id: 'mymensingh',
    name: 'Mymensingh Division',
    districts: [
      {
        name: 'Mymensingh City',
        areas: ['Ganginar Par', 'Charpara', 'Town Hall', 'Kewatkhali', 'Maskanda']
      },
      {
        name: 'Jamalpur',
        areas: ['Jamalpur Sadar', 'Sarishabari', 'Islampur']
      }
    ]
  }
];

export const DELIVERY_RATES = {
  INSIDE_DHAKA: 60,
  OUTSIDE_DHAKA: 120,
  EXPRESS_DHAKA: 150,
  FREE_SHIPPING_THRESHOLD: 2500
};

export const PAYMENT_METHODS = [
  {
    id: 'cod',
    name: 'Cash on Delivery (COD)',
    description: 'Pay with cash upon physical inspection of parcel at home. No advance payment required.'
  },
  {
    id: 'bkash',
    name: 'bKash Mobile Banking',
    description: 'Instant bKash payment gateway. Fast, secure, and zero transaction fee.'
  },
  {
    id: 'nagad',
    name: 'Nagad Direct Pay',
    description: 'Pay effortlessly with Nagad digital wallet.'
  },
  {
    id: 'card',
    name: 'Visa / Mastercard / Amex',
    description: 'Pay securely using any local or international debit/credit card.'
  }
];

