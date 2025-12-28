export interface FlashcardWord {
  id: string;
  arabic: string;
  transliteration: string;
  english: string;
  category: string;
  image?: string;
}

export interface FlashcardCategory {
  id: string;
  name: string;
  nameArabic: string;
  icon: string;
  description: string;
}

export const flashcardCategories: FlashcardCategory[] = [
  { id: "fruits", name: "Fruits", nameArabic: "فَوَاكِه", icon: "🍎", description: "Common fruits in Arabic" },
  { id: "animals", name: "Animals", nameArabic: "حَيَوَانَات", icon: "🐱", description: "Learn animal names" },
  { id: "home", name: "Home & Furniture", nameArabic: "بَيْت وَأَثَاث", icon: "🏠", description: "Items around the house" },
  { id: "body", name: "Body Parts", nameArabic: "أَعْضَاء الجِسْم", icon: "🫀", description: "Parts of the human body" },
  { id: "nature", name: "Nature", nameArabic: "طَبِيعَة", icon: "🌳", description: "Natural world vocabulary" },
  { id: "food", name: "Food & Drink", nameArabic: "طَعَام وَشَرَاب", icon: "🍞", description: "Food and beverages" },
  { id: "colors", name: "Colors", nameArabic: "أَلْوَان", icon: "🎨", description: "Learn all the colors" },
  { id: "numbers", name: "Numbers", nameArabic: "أَرْقَام", icon: "🔢", description: "Count in Arabic" },
  { id: "family", name: "Family", nameArabic: "عَائِلَة", icon: "👨‍👩‍👧‍👦", description: "Family members" },
  { id: "places", name: "Places", nameArabic: "أَمَاكِن", icon: "🏙️", description: "Cities, villages, buildings" },
  { id: "weather", name: "Weather", nameArabic: "طَقْس", icon: "☀️", description: "Weather vocabulary" },
  { id: "time", name: "Time", nameArabic: "وَقْت", icon: "⏰", description: "Time expressions" },
];

export const flashcardWords: FlashcardWord[] = [
  // Fruits
  { id: "apple", arabic: "تُفَّاحَة", transliteration: "tuffāḥah", english: "Apple", category: "fruits", image: "/src/assets/flashcards/apple.png" },
  { id: "banana", arabic: "مَوْزَة", transliteration: "mawzah", english: "Banana", category: "fruits" },
  { id: "orange", arabic: "بُرْتُقَالَة", transliteration: "burtuqālah", english: "Orange", category: "fruits" },
  { id: "grape", arabic: "عِنَب", transliteration: "ʿinab", english: "Grapes", category: "fruits" },
  { id: "watermelon", arabic: "بِطِّيخ", transliteration: "biṭṭīkh", english: "Watermelon", category: "fruits" },
  { id: "strawberry", arabic: "فَرَاوِلَة", transliteration: "farāwilah", english: "Strawberry", category: "fruits" },
  { id: "mango", arabic: "مَانْجُو", transliteration: "mānjū", english: "Mango", category: "fruits" },
  { id: "pomegranate", arabic: "رُمَّان", transliteration: "rummān", english: "Pomegranate", category: "fruits" },
  { id: "date", arabic: "تَمْر", transliteration: "tamr", english: "Date", category: "fruits" },
  { id: "fig", arabic: "تِين", transliteration: "tīn", english: "Fig", category: "fruits" },
  
  // Animals
  { id: "cat", arabic: "قِطَّة", transliteration: "qiṭṭah", english: "Cat", category: "animals", image: "/src/assets/flashcards/cat.png" },
  { id: "dog", arabic: "كَلْب", transliteration: "kalb", english: "Dog", category: "animals" },
  { id: "bird", arabic: "طَائِر", transliteration: "ṭāʾir", english: "Bird", category: "animals" },
  { id: "fish", arabic: "سَمَكَة", transliteration: "samakah", english: "Fish", category: "animals" },
  { id: "lion", arabic: "أَسَد", transliteration: "asad", english: "Lion", category: "animals" },
  { id: "horse", arabic: "حِصَان", transliteration: "ḥiṣān", english: "Horse", category: "animals" },
  { id: "camel", arabic: "جَمَل", transliteration: "jamal", english: "Camel", category: "animals" },
  { id: "elephant", arabic: "فِيل", transliteration: "fīl", english: "Elephant", category: "animals" },
  { id: "sheep", arabic: "خَرُوف", transliteration: "kharūf", english: "Sheep", category: "animals" },
  { id: "cow", arabic: "بَقَرَة", transliteration: "baqarah", english: "Cow", category: "animals" },
  { id: "chicken", arabic: "دَجَاجَة", transliteration: "dajājah", english: "Chicken", category: "animals" },
  { id: "rabbit", arabic: "أَرْنَب", transliteration: "arnab", english: "Rabbit", category: "animals" },
  
  // Home & Furniture
  { id: "house", arabic: "بَيْت", transliteration: "bayt", english: "House", category: "home", image: "/src/assets/flashcards/house.png" },
  { id: "door", arabic: "بَاب", transliteration: "bāb", english: "Door", category: "home", image: "/src/assets/flashcards/door.png" },
  { id: "window", arabic: "نَافِذَة", transliteration: "nāfidhah", english: "Window", category: "home" },
  { id: "table", arabic: "طَاوِلَة", transliteration: "ṭāwilah", english: "Table", category: "home", image: "/src/assets/flashcards/table.png" },
  { id: "chair", arabic: "كُرْسِيّ", transliteration: "kursiyy", english: "Chair", category: "home" },
  { id: "bed", arabic: "سَرِير", transliteration: "sarīr", english: "Bed", category: "home" },
  { id: "kitchen", arabic: "مَطْبَخ", transliteration: "maṭbakh", english: "Kitchen", category: "home" },
  { id: "bathroom", arabic: "حَمَّام", transliteration: "ḥammām", english: "Bathroom", category: "home" },
  { id: "room", arabic: "غُرْفَة", transliteration: "ghurfah", english: "Room", category: "home" },
  { id: "key", arabic: "مِفْتَاح", transliteration: "miftāḥ", english: "Key", category: "home" },
  { id: "lamp", arabic: "مِصْبَاح", transliteration: "miṣbāḥ", english: "Lamp", category: "home" },
  { id: "mirror", arabic: "مِرْآة", transliteration: "mirʾāh", english: "Mirror", category: "home" },
  
  // Body Parts
  { id: "head", arabic: "رَأْس", transliteration: "raʾs", english: "Head", category: "body" },
  { id: "eye", arabic: "عَيْن", transliteration: "ʿayn", english: "Eye", category: "body" },
  { id: "ear", arabic: "أُذُن", transliteration: "udhun", english: "Ear", category: "body" },
  { id: "nose", arabic: "أَنْف", transliteration: "anf", english: "Nose", category: "body" },
  { id: "mouth", arabic: "فَم", transliteration: "fam", english: "Mouth", category: "body" },
  { id: "hand", arabic: "يَد", transliteration: "yad", english: "Hand", category: "body" },
  { id: "foot", arabic: "قَدَم", transliteration: "qadam", english: "Foot", category: "body" },
  { id: "heart", arabic: "قَلْب", transliteration: "qalb", english: "Heart", category: "body" },
  { id: "finger", arabic: "إِصْبَع", transliteration: "iṣbaʿ", english: "Finger", category: "body" },
  { id: "tongue", arabic: "لِسَان", transliteration: "lisān", english: "Tongue", category: "body" },
  
  // Nature
  { id: "sun", arabic: "شَمْس", transliteration: "shams", english: "Sun", category: "nature", image: "/src/assets/flashcards/sun.png" },
  { id: "moon", arabic: "قَمَر", transliteration: "qamar", english: "Moon", category: "nature", image: "/src/assets/flashcards/moon.png" },
  { id: "star", arabic: "نَجْم", transliteration: "najm", english: "Star", category: "nature" },
  { id: "sky", arabic: "سَمَاء", transliteration: "samāʾ", english: "Sky", category: "nature" },
  { id: "water", arabic: "مَاء", transliteration: "māʾ", english: "Water", category: "nature" },
  { id: "tree", arabic: "شَجَرَة", transliteration: "shajarah", english: "Tree", category: "nature", image: "/src/assets/flashcards/tree.png" },
  { id: "flower", arabic: "زَهْرَة", transliteration: "zahrah", english: "Flower", category: "nature" },
  { id: "mountain", arabic: "جَبَل", transliteration: "jabal", english: "Mountain", category: "nature" },
  { id: "sea", arabic: "بَحْر", transliteration: "baḥr", english: "Sea", category: "nature" },
  { id: "river", arabic: "نَهْر", transliteration: "nahr", english: "River", category: "nature" },
  { id: "earth", arabic: "أَرْض", transliteration: "arḍ", english: "Earth/Land", category: "nature" },
  { id: "fire", arabic: "نَار", transliteration: "nār", english: "Fire", category: "nature" },
  
  // Food & Drink
  { id: "bread", arabic: "خُبْز", transliteration: "khubz", english: "Bread", category: "food" },
  { id: "rice", arabic: "أُرُز", transliteration: "uruz", english: "Rice", category: "food" },
  { id: "meat", arabic: "لَحْم", transliteration: "laḥm", english: "Meat", category: "food" },
  { id: "milk", arabic: "حَلِيب", transliteration: "ḥalīb", english: "Milk", category: "food" },
  { id: "egg", arabic: "بَيْضَة", transliteration: "bayḍah", english: "Egg", category: "food" },
  { id: "cheese", arabic: "جُبْن", transliteration: "jubn", english: "Cheese", category: "food" },
  { id: "honey", arabic: "عَسَل", transliteration: "ʿasal", english: "Honey", category: "food" },
  { id: "tea", arabic: "شَاي", transliteration: "shāy", english: "Tea", category: "food" },
  { id: "coffee", arabic: "قَهْوَة", transliteration: "qahwah", english: "Coffee", category: "food" },
  { id: "sugar", arabic: "سُكَّر", transliteration: "sukkar", english: "Sugar", category: "food" },
  
  // Colors
  { id: "red", arabic: "أَحْمَر", transliteration: "aḥmar", english: "Red", category: "colors" },
  { id: "blue", arabic: "أَزْرَق", transliteration: "azraq", english: "Blue", category: "colors" },
  { id: "green", arabic: "أَخْضَر", transliteration: "akhḍar", english: "Green", category: "colors" },
  { id: "yellow", arabic: "أَصْفَر", transliteration: "aṣfar", english: "Yellow", category: "colors" },
  { id: "white", arabic: "أَبْيَض", transliteration: "abyaḍ", english: "White", category: "colors" },
  { id: "black", arabic: "أَسْوَد", transliteration: "aswad", english: "Black", category: "colors" },
  { id: "orange-color", arabic: "بُرْتُقَالِيّ", transliteration: "burtuqāliyy", english: "Orange", category: "colors" },
  { id: "purple", arabic: "بَنَفْسَجِيّ", transliteration: "banafsajiyy", english: "Purple", category: "colors" },
  { id: "brown", arabic: "بُنِّيّ", transliteration: "bunniyy", english: "Brown", category: "colors" },
  { id: "pink", arabic: "وَرْدِيّ", transliteration: "wardiyy", english: "Pink", category: "colors" },
  
  // Numbers
  { id: "one", arabic: "وَاحِد", transliteration: "wāḥid", english: "One (1)", category: "numbers" },
  { id: "two", arabic: "اِثْنَان", transliteration: "ithnān", english: "Two (2)", category: "numbers" },
  { id: "three", arabic: "ثَلَاثَة", transliteration: "thalāthah", english: "Three (3)", category: "numbers" },
  { id: "four", arabic: "أَرْبَعَة", transliteration: "arbaʿah", english: "Four (4)", category: "numbers" },
  { id: "five", arabic: "خَمْسَة", transliteration: "khamsah", english: "Five (5)", category: "numbers" },
  { id: "six", arabic: "سِتَّة", transliteration: "sittah", english: "Six (6)", category: "numbers" },
  { id: "seven", arabic: "سَبْعَة", transliteration: "sabʿah", english: "Seven (7)", category: "numbers" },
  { id: "eight", arabic: "ثَمَانِيَة", transliteration: "thamāniyah", english: "Eight (8)", category: "numbers" },
  { id: "nine", arabic: "تِسْعَة", transliteration: "tisʿah", english: "Nine (9)", category: "numbers" },
  { id: "ten", arabic: "عَشَرَة", transliteration: "ʿasharah", english: "Ten (10)", category: "numbers" },
  
  // Family
  { id: "father", arabic: "أَب", transliteration: "ab", english: "Father", category: "family" },
  { id: "mother", arabic: "أُمّ", transliteration: "umm", english: "Mother", category: "family" },
  { id: "son", arabic: "اِبْن", transliteration: "ibn", english: "Son", category: "family" },
  { id: "daughter", arabic: "بِنْت", transliteration: "bint", english: "Daughter", category: "family" },
  { id: "brother", arabic: "أَخ", transliteration: "akh", english: "Brother", category: "family" },
  { id: "sister", arabic: "أُخْت", transliteration: "ukht", english: "Sister", category: "family" },
  { id: "grandfather", arabic: "جَدّ", transliteration: "jadd", english: "Grandfather", category: "family" },
  { id: "grandmother", arabic: "جَدَّة", transliteration: "jaddah", english: "Grandmother", category: "family" },
  { id: "uncle", arabic: "عَمّ", transliteration: "ʿamm", english: "Uncle (paternal)", category: "family" },
  { id: "aunt", arabic: "عَمَّة", transliteration: "ʿammah", english: "Aunt (paternal)", category: "family" },
  
  // Places
  { id: "city", arabic: "مَدِينَة", transliteration: "madīnah", english: "City", category: "places" },
  { id: "village", arabic: "قَرْيَة", transliteration: "qaryah", english: "Village", category: "places" },
  { id: "mosque", arabic: "مَسْجِد", transliteration: "masjid", english: "Mosque", category: "places" },
  { id: "school", arabic: "مَدْرَسَة", transliteration: "madrasah", english: "School", category: "places" },
  { id: "market", arabic: "سُوق", transliteration: "sūq", english: "Market", category: "places" },
  { id: "hospital", arabic: "مُسْتَشْفَى", transliteration: "mustashfā", english: "Hospital", category: "places" },
  { id: "street", arabic: "شَارِع", transliteration: "shāriʿ", english: "Street", category: "places" },
  { id: "garden", arabic: "حَدِيقَة", transliteration: "ḥadīqah", english: "Garden", category: "places" },
  { id: "library", arabic: "مَكْتَبَة", transliteration: "maktabah", english: "Library", category: "places" },
  { id: "airport", arabic: "مَطَار", transliteration: "maṭār", english: "Airport", category: "places" },
  
  // Weather
  { id: "rain", arabic: "مَطَر", transliteration: "maṭar", english: "Rain", category: "weather" },
  { id: "wind", arabic: "رِيح", transliteration: "rīḥ", english: "Wind", category: "weather" },
  { id: "cloud", arabic: "سَحَاب", transliteration: "saḥāb", english: "Cloud", category: "weather" },
  { id: "snow", arabic: "ثَلْج", transliteration: "thalj", english: "Snow", category: "weather" },
  { id: "hot", arabic: "حَارّ", transliteration: "ḥārr", english: "Hot", category: "weather" },
  { id: "cold", arabic: "بَارِد", transliteration: "bārid", english: "Cold", category: "weather" },
  
  // Time
  { id: "day", arabic: "يَوْم", transliteration: "yawm", english: "Day", category: "time" },
  { id: "night", arabic: "لَيْل", transliteration: "layl", english: "Night", category: "time" },
  { id: "morning", arabic: "صَبَاح", transliteration: "ṣabāḥ", english: "Morning", category: "time" },
  { id: "evening", arabic: "مَسَاء", transliteration: "masāʾ", english: "Evening", category: "time" },
  { id: "hour", arabic: "سَاعَة", transliteration: "sāʿah", english: "Hour", category: "time" },
  { id: "week", arabic: "أُسْبُوع", transliteration: "usbūʿ", english: "Week", category: "time" },
  { id: "month", arabic: "شَهْر", transliteration: "shahr", english: "Month", category: "time" },
  { id: "year", arabic: "سَنَة", transliteration: "sanah", english: "Year", category: "time" },
  { id: "today", arabic: "اليَوْم", transliteration: "al-yawm", english: "Today", category: "time" },
  { id: "tomorrow", arabic: "غَداً", transliteration: "ghadan", english: "Tomorrow", category: "time" },
];

export const getWordsByCategory = (categoryId: string): FlashcardWord[] => {
  return flashcardWords.filter(word => word.category === categoryId);
};

export const getCategoryById = (categoryId: string): FlashcardCategory | undefined => {
  return flashcardCategories.find(cat => cat.id === categoryId);
};
