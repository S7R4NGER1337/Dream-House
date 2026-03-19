require('dotenv').config()
const mongoose = require('mongoose')
const Property = require('./models/Property')

const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`

const properties = [
  {
    name: 'Modern Suburban Oasis',
    price: 1200000,
    location: '123 Maple Street, Sunnyvale, CA 94087',
    coverImage: img('1564013799919-ab600027ffc6'),
    images: [
      img('1564013799919-ab600027ffc6'),
      img('1613977257363-707ba9348227'),
      img('1556909114-f6e7ad7d3136'),
      img('1484154218962-a197022b5858'),
      img('1556909172-54557c7e4fb7'),
    ],
    description: 'Welcome to your dream home in the heart of Sunnyvale. This stunning property offers the perfect blend of modern luxury and comfortable living. With an open-concept floor plan, high ceilings, and an abundance of natural light, this home is designed for both relaxation and entertaining. The gourmet kitchen features top-of-the-line appliances, quartz countertops, and a large island perfect for family gatherings. Step outside to your private backyard oasis with a beautifully landscaped garden.',
    amenities: ['Central Air Conditioning', 'Hardwood Floors', 'Swimming Pool', 'Two-Car Garage', 'Smart Home System', 'Fireplace', 'Gourmet Kitchen', 'Walk-in Closets', 'Landscaped Garden'],
    beds: 4,
    baths: 3,
    sqft: 2500,
    build: 2021,
    status: true,
  },
  {
    name: 'Beachfront Luxury Villa',
    price: 2500000,
    location: '456 Ocean Drive, Miami, FL 33139',
    coverImage: img('1600596542815-ffad4c1539a9'),
    images: [
      img('1600596542815-ffad4c1539a9'),
      img('1512917774080-9991f1c4c750'),
      img('1600210491892-03d54c0aaf87'),
      img('1552321554-5fefe8c9ef14'),
      img('1600566752355-35792bedcfea'),
    ],
    description: 'Experience the ultimate coastal lifestyle in this breathtaking beachfront villa. Floor-to-ceiling windows frame panoramic ocean views from every room. The open living spaces flow seamlessly to a sprawling terrace and private pool overlooking the Atlantic. The chef\'s kitchen is equipped with premium appliances and a wine cellar. The master suite features a private balcony and a spa-inspired bathroom.',
    amenities: ['Private Beach Access', 'Infinity Pool', 'Home Theater', 'Smart Home System', 'Wine Cellar', 'Rooftop Terrace', 'Gourmet Kitchen', 'Guest House', 'Private Gym'],
    beds: 5,
    baths: 5,
    sqft: 4500,
    build: 2019,
    status: true,
  },
  {
    name: 'Downtown Loft Retreat',
    price: 850000,
    location: '789 Congress Ave, Austin, TX 78701',
    coverImage: img('1560448204-e02f11c3d0e2'),
    images: [
      img('1560448204-e02f11c3d0e2'),
      img('1618221195710-dd6b41faaea6'),
      img('1523217582562-09d0def993a6'),
      img('1527853787696-f7be74f2e39a'),
      img('1507089947368-19c1da9775ae'),
    ],
    description: 'A stunning industrial-chic loft in the heart of downtown Austin. Exposed brick walls, soaring 14-foot ceilings, and polished concrete floors create a dramatic and stylish interior. The open-plan living area is perfect for entertaining, and the chef\'s kitchen boasts a full suite of stainless steel appliances. Walk to the city\'s best restaurants, bars, and live music venues. Private parking included.',
    amenities: ['Rooftop Deck', 'Concierge Service', 'Fitness Center', 'Bike Storage', 'EV Charging', 'Open Floor Plan', 'City Views', 'In-Unit Laundry', 'Pet Friendly'],
    beds: 3,
    baths: 2,
    sqft: 1800,
    build: 2018,
    status: true,
  },
  {
    name: 'Mountain View Escape',
    price: 975000,
    location: '321 Pine Ridge Road, Denver, CO 80203',
    coverImage: img('1570129477492-45c003edd2be'),
    images: [
      img('1570129477492-45c003edd2be'),
      img('1580587771525-78b9dba3b914'),
      img('1583608205776-bfd35f0d9f83'),
      img('1615529328331-f8917597711f'),
      img('1629140727571-9b5c6f6267b4'),
    ],
    description: 'Nestled in the foothills with sweeping views of the Rocky Mountains, this beautifully crafted home offers a rare connection to nature without sacrificing modern comfort. The wraparound deck is perfect for morning coffee and evening sunsets. Inside, vaulted ceilings, a stone fireplace, and warm hardwood floors create a cozy mountain atmosphere. Minutes from world-class hiking, skiing, and biking.',
    amenities: ['Mountain Views', 'Stone Fireplace', 'Wraparound Deck', 'Finished Basement', 'Home Office', 'Hardwood Floors', 'Ski Storage', 'Hot Tub', 'Two-Car Garage'],
    beds: 4,
    baths: 3,
    sqft: 2300,
    build: 2020,
    status: true,
  },
  {
    name: 'Classic Colonial Estate',
    price: 1450000,
    location: '55 Elm Street, Boston, MA 02108',
    coverImage: img('1518780664697-55e3ad937233'),
    images: [
      img('1518780664697-55e3ad937233'),
      img('1558618666-fcd25c85cd64'),
      img('1502005229762-cf1b2da7c5d6'),
      img('1505691938895-1758d7feb511'),
      img('1598928636135-d146006ff4be'),
    ],
    description: 'A magnificent colonial estate on one of Boston\'s most prestigious streets. This meticulously maintained home combines timeless architecture with thoughtful modern updates. The grand foyer opens to formal living and dining rooms with original crown molding and hardwood floors throughout. The updated chef\'s kitchen connects to a sunlit family room overlooking a manicured private garden.',
    amenities: ['Original Crown Molding', 'Formal Dining Room', 'Chef\'s Kitchen', 'Private Garden', 'Walk-in Closets', 'Hardwood Floors', 'Butler\'s Pantry', 'Finished Attic', 'Wine Cellar'],
    beds: 5,
    baths: 4,
    sqft: 3200,
    build: 2017,
    status: true,
  },
  {
    name: 'Contemporary Hillside Home',
    price: 3200000,
    location: '1800 Mulholland Drive, Los Angeles, CA 90046',
    coverImage: img('1600585154340-be6161a56a0c'),
    images: [
      img('1600585154340-be6161a56a0c'),
      img('1616594039964-ae9021a400a0'),
      img('1631049307264-da0ec9d70304'),
      img('1604014237800-1c9102c219da'),
      img('1600047509807-ba8f99d2cdde'),
    ],
    description: 'An architectural masterpiece perched high in the Hollywood Hills with unobstructed 270-degree views of the city, canyons, and ocean. This newly built smart home features floor-to-ceiling glass walls, a cantilevered infinity pool, and a rooftop deck designed for entertaining. The open living spaces are bathed in natural light and connect seamlessly to the outdoor terraces.',
    amenities: ['Infinity Pool', 'City & Ocean Views', 'Smart Home System', 'Home Theater', 'Rooftop Deck', 'Six-Car Garage', 'Chef\'s Kitchen', 'Spa & Sauna', 'Private Gate'],
    beds: 4,
    baths: 4,
    sqft: 3800,
    build: 2022,
    status: true,
  },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to database')

    await Property.deleteMany({})
    console.log('Cleared existing properties')

    const inserted = await Property.insertMany(properties)
    console.log(`Seeded ${inserted.length} properties:`)
    inserted.forEach(p => console.log(`  - ${p.name} (${p._id})`))

    await mongoose.disconnect()
    console.log('Done.')
  } catch (error) {
    console.error('Seed failed:', error)
    process.exit(1)
  }
}

seed()
