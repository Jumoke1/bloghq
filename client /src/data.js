import fruits from "./images/fruits.jpg";
import Fitness from "./images/Fitness.jpg";
import Travel from "./images/Travel.jpg"; 

const DUMMY_POSTS = [
  {
    id: '1',
    image: fruits,
    category: 'education',
    title: 'Girl child School Education',
    description: "Girl child education is an essential aspect of societal development and a key to achieving gender equality. Educating girls has a profound impact not only on the individual girl but also on her family, community, and the broader society. When girls receive quality education, they gain the knowledge and skills necessary to navigate life, contribute to their communities, and break the cycle of poverty",
    authorID: 3
  },
  {
    id: '2',
    image: Fitness,
    category: 'health',
    title: 'Fitness for All Ages',
    description: "Fitness is important for people of all ages. Regular physical activity helps to maintain a healthy weight, reduce the risk of chronic diseases, and promote overall health and well-being.",
    authorID: 4
  },
  {
    id: '3',
    image: Travel,
    category: 'travel',
    title: 'Exploring the World',
    description: "Traveling opens up new horizons and allows you to experience different cultures, cuisines, and landscapes. It's an enriching experience that broadens your perspective.",
    authorID: 5
  }
];

export default DUMMY_POSTS;
