import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FlashcardWord } from '@/data/flashcardVocabulary';
import { useInstantAudio } from '@/hooks/useInstantAudio';

interface FlashCardProps {
  word: FlashcardWord;
  showImage?: boolean;
}

export const FlashCard = ({ word, showImage = true }: FlashCardProps) => {
  const { speak, isTextPlaying } = useInstantAudio();
  const isPlaying = isTextPlaying(word.arabic);

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await speak(word.arabic);
    } catch (error) {
      console.error('Failed to play pronunciation:', error);
    }
  };

  // Generate a placeholder gradient based on word category
  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      fruits: 'from-red-400 to-orange-400',
      animals: 'from-amber-400 to-yellow-400',
      home: 'from-blue-400 to-cyan-400',
      body: 'from-pink-400 to-rose-400',
      nature: 'from-green-400 to-emerald-400',
      food: 'from-orange-400 to-amber-400',
      colors: 'from-purple-400 to-pink-400',
      numbers: 'from-indigo-400 to-blue-400',
      family: 'from-teal-400 to-cyan-400',
      places: 'from-slate-400 to-gray-400',
      weather: 'from-sky-400 to-blue-400',
      time: 'from-violet-400 to-purple-400',
    };
    return gradients[category] || 'from-primary to-primary/80';
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl bg-card border border-border shadow-lg overflow-hidden">
        {/* Image area */}
        {showImage && (
          <div className={`h-[160px] bg-gradient-to-br ${getCategoryGradient(word.category)} flex items-center justify-center`}>
            {word.image ? (
              <img 
                src={word.image} 
                alt={word.english}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl">{getEmojiForWord(word.id)}</span>
            )}
          </div>
        )}
        
        {/* Content area */}
        <div className="p-6 flex flex-col items-center text-center">
          {/* English - always visible */}
          <p className="text-2xl font-bold text-foreground mb-3">
            {word.english}
          </p>
          
          <div className="w-12 h-0.5 bg-primary/30 rounded-full mb-3" />
          
          {/* Arabic */}
          <p className="text-4xl font-arabic text-primary mb-2 leading-relaxed">
            {word.arabic}
          </p>
          
          {/* Transliteration */}
          <p className="text-sm text-muted-foreground italic mb-4">
            {word.transliteration}
          </p>
          
          {/* Audio button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleSpeak}
            className="gap-2"
          >
            <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-primary animate-pulse' : ''}`} />
            Listen
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get emoji for word
function getEmojiForWord(wordId: string): string {
  const emojiMap: Record<string, string> = {
    // ========== FRUITS ==========
    apple: '🍎', banana: '🍌', orange: '🍊', grape: '🍇', watermelon: '🍉',
    strawberry: '🍓', mango: '🥭', pomegranate: '🫐', date: '🫘', fig: '🍈',
    pear: '🍐', peach: '🍑', apricot: '🟠', cherry: '🍒', plum: '🟣',
    lemon: '🍋', lime: '🍈', pineapple: '🍍', coconut: '🥥', kiwi: '🥝',
    melon: '🍈', cantaloupe: '🍈', papaya: '🥭', guava: '🍐', avocado: '🥑',
    blackberry: '🫐', raspberry: '🍇', blueberry: '🫐', olive: '🫒', grapefruit: '🍊',

    // ========== VEGETABLES ==========
    tomato: '🍅', potato: '🥔', onion: '🧅', garlic: '🧄', carrot: '🥕',
    cucumber: '🥒', lettuce: '🥬', cabbage: '🥬', pepper: '🫑', eggplant: '🍆',
    zucchini: '🥒', pumpkin: '🎃', spinach: '🥬', parsley: '🌿', mint: '🌿',
    celery: '🥬', broccoli: '🥦', cauliflower: '🥦', corn: '🌽', peas: '🫛',
    beans: '🫘', lentils: '🫘', chickpeas: '🫘', radish: '🥕', turnip: '🥔',
    beet: '🟣', 'sweet-potato': '🍠', ginger: '🫚', mushroom: '🍄', artichoke: '🌿',
    asparagus: '🌿', okra: '🫑', leek: '🧅', 'green-onion': '🧅',

    // ========== ANIMALS ==========
    cat: '🐱', dog: '🐕', lion: '🦁', horse: '🐴', camel: '🐪',
    elephant: '🐘', sheep: '🐑', cow: '🐄', chicken: '🐔', rabbit: '🐰',
    tiger: '🐅', bear: '🐻', wolf: '🐺', fox: '🦊', deer: '🦌',
    monkey: '🐵', giraffe: '🦒', zebra: '🦓', hippo: '🦛', rhino: '🦏',
    crocodile: '🐊', snake: '🐍', turtle: '🐢', frog: '🐸', mouse: '🐭',
    rat: '🐀', donkey: '🫏', mule: '🫏', goat: '🐐', pig: '🐷',
    buffalo: '🦬', leopard: '🐆', cheetah: '🐆', panther: '🐆', kangaroo: '🦘',
    koala: '🐨', panda: '🐼', squirrel: '🐿️', hedgehog: '🦔', bat: '🦇',
    gorilla: '🦍', chimpanzee: '🐵', antelope: '🦌', hyena: '🐺', jackal: '🐺',
    lizard: '🦎', salamander: '🦎',

    // ========== BIRDS ==========
    'bird-general': '🐦', eagle: '🦅', hawk: '🦅', owl: '🦉', crow: '🐦‍⬛',
    sparrow: '🐦', pigeon: '🕊️', parrot: '🦜', peacock: '🦚', duck: '🦆',
    goose: '🦢', swan: '🦢', rooster: '🐓', hen: '🐔',
    ostrich: '🦤', penguin: '🐧', flamingo: '🦩', pelican: '🦤', heron: '🦢',
    stork: '🦤', vulture: '🦅', seagull: '🐦', woodpecker: '🐦', hummingbird: '🐦',
    canary: '🐤', nightingale: '🐦', raven: '🐦‍⬛', kingfisher: '🐦',

    // ========== SEA CREATURES ==========
    fish: '🐟', whale: '🐋', dolphin: '🐬', shark: '🦈', octopus: '🐙',
    squid: '🦑', crab: '🦀', lobster: '🦞', shrimp: '🦐', oyster: '🦪',
    clam: '🦪', starfish: '🌟', jellyfish: '🪼', seal: '🦭', walrus: '🦭',
    seahorse: '🐡', eel: '🐍', stingray: '🐟', coral: '🪸', salmon: '🐟',
    tuna: '🐟', sardine: '🐟', mussel: '🦪',

    // ========== INSECTS ==========
    butterfly: '🦋', bee: '🐝', ant: '🐜', fly: '🪰', mosquito: '🦟',
    spider: '🕷️', beetle: '🪲', grasshopper: '🦗', locust: '🦗', cricket: '🦗',
    cockroach: '🪳', dragonfly: '🪰', ladybug: '🐞', caterpillar: '🐛', worm: '🪱',
    snail: '🐌', scorpion: '🦂', wasp: '🐝', moth: '🦋', flea: '🦟',

    // ========== HOME & FURNITURE ==========
    house: '🏠', door: '🚪', window: '🪟', table: '🪑', chair: '💺',
    bed: '🛏️', room: '🛋️', key: '🔑', lamp: '🪔', mirror: '🪞',
    sofa: '🛋️', carpet: '🧶', curtain: '🪟', ceiling: '🏠', floor: '🏠',
    wall: '🧱', stairs: '🪜', roof: '🏠', balcony: '🏠', garage: '🚗',
    'garden-home': '🌷', fence: '🏡', shelf: '📚', wardrobe: '🚪', drawer: '🗄️',
    desk: '🖥️', pillow: '🛏️', blanket: '🛏️', mattress: '🛏️', clock: '🕐',
    picture: '🖼️', vase: '🏺', fan: '🌀', 'air-conditioner': '❄️', heater: '🔥',
    television: '📺', radio: '📻', telephone: '📞',

    // ========== KITCHEN ==========
    'kitchen-room': '🍳', stove: '🔥', oven: '🔥', refrigerator: '🧊', microwave: '📦',
    pot: '🍲', pan: '🍳', plate: '🍽️', bowl: '🥣', cup: '☕',
    glass: '🥛', spoon: '🥄', fork: '🍴', knife: '🔪', kettle: '🫖',
    teapot: '🫖', 'coffee-pot': '☕', tray: '🍽️', napkin: '🧻', 'cutting-board': '🪓',
    blender: '🥤', toaster: '🍞', dishwasher: '🍽️', sink: '🚰', faucet: '🚰',
    sponge: '🧽', soap: '🧼', 'can-opener': '🥫', 'bottle-opener': '🍾',

    // ========== CLOTHING ==========
    shirt: '👔', pants: '👖', dress: '👗', skirt: '👗', jacket: '🧥',
    coat: '🧥', sweater: '🧥', 't-shirt': '👕', jeans: '👖', shorts: '🩳',
    socks: '🧦', shoes: '👟', sandals: '🩴', boots: '👢', slippers: '🩴',
    hat: '🎩', cap: '🧢', scarf: '🧣', gloves: '🧤', belt: '👔',
    tie: '👔', hijab: '🧕', thobe: '👘', abaya: '👘', suit: '🤵',
    underwear: '🩲', swimsuit: '👙', pajamas: '😴',
    watch: '⌚', glasses: '👓', sunglasses: '🕶️', ring: '💍', necklace: '📿',
    bracelet: '📿', earrings: '💎', purse: '👛', wallet: '👝', backpack: '🎒',
    umbrella: '☂️', niqab: '🧕',

    // ========== BODY PARTS ==========
    head: '👤', eye: '👁️', ear: '👂', nose: '👃', mouth: '👄',
    hand: '🤚', foot: '🦶', heart: '❤️', finger: '☝️', tongue: '👅',
    hair: '💇', face: '😊', tooth: '🦷', lip: '👄', neck: '🦢',
    shoulder: '🙆', arm: '💪', leg: '🦵', knee: '🦵', back: '🧍',
    stomach: '🤰', chest: '🫁', brain: '🧠', blood: '🩸', bone: '🦴',
    skin: '🖐️', nail: '💅', eyebrow: '🤨', eyelash: '👁️',
    beard: '🧔', mustache: '👨', elbow: '💪', wrist: '⌚', palm: '🖐️',
    thumb: '👍', ankle: '🦶', heel: '🦶', toe: '🦶', waist: '👗',
    hip: '🧍', liver: '🫀', kidney: '🫘', lung: '🫁', cheek: '😊',
    chin: '😶', forehead: '🧠',

    // ========== HEALTH & MEDICINE ==========
    doctor: '👨‍⚕️', nurse: '👩‍⚕️', 'nurse-prof': '👩‍⚕️', patient: '🤒',
    'hospital-health': '🏥', medicine: '💊', pill: '💉', injection: '💉',
    bandage: '🩹', thermometer: '🌡️', stethoscope: '🩺',
    'x-ray': '☠️', surgery: '🏥', disease: '🦠', fever: '🤒', cough: '😷',
    headache: '🤕', pain: '😣', allergy: '🤧', virus: '🦠',
    'pharmacy-health': '💊', 'ambulance-health': '🚑', wheelchair: '🦽', crutches: '🩼',
    prescription: '📝', vaccine: '💉',
    sick: '🤒', 'cold-sick': '🤧', wound: '🩹', 'health-noun': '💪',
    treatment: '💊', emergency: '🚨', clinic: '🏥', healthy: '💚',

    // ========== NATURE ==========
    sun: '☀️', moon: '🌙', star: '⭐', sky: '🌤️', water: '💧',
    tree: '🌳', flower: '🌸', mountain: '⛰️', sea: '🌊', river: '🏞️',
    earth: '🌍', fire: '🔥', rain: '🌧️', cloud: '☁️',
    snow: '❄️', wind: '💨', thunder: '⚡', rainbow: '🌈', desert: '🏜️',
    forest: '🌲', ocean: '🌊', lake: '🏞️', island: '🏝️', valley: '🏞️',
    hill: '⛰️', rock: '🪨', sand: '🏖️', grass: '🌿', leaf: '🍃',
    branch: '🌿', root: '🌱', seed: '🌱',
    wave: '🌊', sunrise: '🌅', sunset: '🌇', horizon: '🌅',
    cave: '🕳️', waterfall: '💧', shadow: '🌑', plant: '🌱', rose: '🌹',
    'palm-tree': '🌴', spring: '💧',

    // ========== FOOD & DRINK ==========
    bread: '🍞', rice: '🍚', meat: '🥩', milk: '🥛', egg: '🥚',
    cheese: '🧀', honey: '🍯', tea: '🍵', coffee: '☕', sugar: '🍬',
    salt: '🧂', butter: '🧈', oil: '🫒', soup: '🍲', salad: '🥗',
    pizza: '🍕', sandwich: '🥪', pasta: '🍝', 'chicken-food': '🍗',
    'fish-food': '🐟', cake: '🎂', chocolate: '🍫', 'ice-cream': '🍦',
    juice: '🧃', yogurt: '🥛', cream: '🥛', 'water-drink': '💧',
    nuts: '🥜', falafel: '🧆', hummus: '🫕', kebab: '🍢',
    lamb: '🍖', beef: '🥩', pita: '🫓', shawarma: '🌯',
    breakfast: '🥞', lunch: '🍱', dinner: '🍽️', snack: '🍪',
    flour: '🌾',

    // ========== SPICES & HERBS ==========
    'salt-spice': '🧂', 'pepper-spice': '🌶️', cinnamon: '🟤', cumin: '🟡', turmeric: '🟡',
    saffron: '🟠', cardamom: '🟢', clove: '🟤', nutmeg: '🟤', coriander: '🌿',
    basil: '🌿', oregano: '🌿', thyme: '🌿', rosemary: '🌿',
    dill: '🌿', 'bay-leaf': '🍃', 'chili-pepper': '🌶️', paprika: '🌶️',
    anise: '🟤', fennel: '🌿', sumac: '🟤', vanilla: '🟡', chili: '🌶️',

    // ========== COLORS ==========
    red: '🔴', blue: '🔵', green: '🟢', yellow: '🟡', white: '⚪',
    black: '⚫', 'orange-color': '🟠', purple: '🟣', brown: '🟤', pink: '💗',
    gray: '⚫', beige: '🟤', turquoise: '🔵',
    violet: '🟣',

    // ========== NUMBERS ==========
    one: '1️⃣', two: '2️⃣', three: '3️⃣', four: '4️⃣', five: '5️⃣',
    six: '6️⃣', seven: '7️⃣', eight: '8️⃣', nine: '9️⃣', ten: '🔟',
    zero: '0️⃣', eleven: '1️⃣', twelve: '1️⃣', thirteen: '1️⃣', fourteen: '1️⃣',
    fifteen: '1️⃣', sixteen: '1️⃣', seventeen: '1️⃣', eighteen: '1️⃣', nineteen: '1️⃣',
    twenty: '2️⃣', thirty: '3️⃣',
    forty: '4️⃣', fifty: '5️⃣', sixty: '6️⃣', seventy: '7️⃣', eighty: '8️⃣',
    ninety: '9️⃣', hundred: '💯', thousand: '🔢', million: '🔢',

    // ========== ORDINAL NUMBERS ==========
    first: '🥇', second: '🥈', third: '🥉', fourth: '4️⃣', fifth: '5️⃣',
    sixth: '6️⃣', seventh: '7️⃣', eighth: '8️⃣', ninth: '9️⃣', tenth: '🔟',
    last: '🔚', next: '⏭️',

    // ========== FAMILY ==========
    father: '👨', mother: '👩', son: '👦', daughter: '👧', brother: '👬',
    sister: '👭', grandfather: '👴', grandmother: '👵',
    'uncle-paternal': '👨', 'aunt-paternal': '👩', 'uncle-maternal': '👨', 'aunt-maternal': '👩',
    'cousin-male': '👦', 'cousin-female': '👧',
    nephew: '👦', niece: '👧', husband: '🤵', wife: '👰',
    baby: '👶', child: '🧒', children: '👧', parents: '👫',
    'family-unit': '👨‍👩‍👧‍👦',
    grandson: '👦', granddaughter: '👧',
    'father-in-law': '👴', 'mother-in-law': '👵',
    twins: '👯', stepfather: '👨', stepmother: '👩',

    // ========== PROFESSIONS ==========
    teacher: '👨‍🏫', 'doctor-prof': '👨‍⚕️', engineer: '👷', lawyer: '⚖️', judge: '⚖️',
    pilot: '👨‍✈️', farmer: '👨‍🌾', chef: '👨‍🍳', police: '👮', firefighter: '👨‍🚒',
    soldier: '💂', artist: '👨‍🎨', musician: '🎵', writer: '✍️', journalist: '📰',
    photographer: '📷', architect: '🏛️', scientist: '🔬', accountant: '🧮', manager: '💼',
    secretary: '📋', programmer: '💻', mechanic: '🔧', electrician: '⚡', plumber: '🔧',
    carpenter: '🪚', tailor: '🪡', barber: '💈', dentist: '🦷', pharmacist: '💊',
    veterinarian: '🐾', translator: '🌐', imam: '🕌', businessman: '💼', shopkeeper: '🏪',
    baker: '🍞', butcher: '🥩', fisherman: '🎣', driver: '🚗', designer: '🎨',
    professor: '👨‍🏫', student: '👨‍🎓',

    // ========== PLACES ==========
    city: '🏙️', village: '🏘️', mosque: '🕌', school: '🏫', market: '🏪',
    hospital: '🏥', street: '🛣️', garden: '🌷', library: '📚', airport: '✈️',
    hotel: '🏨', restaurant: '🍽️', bank: '🏦', 'post-office': '📮', station: '🚉',
    park: '🌳', beach: '🏖️', museum: '🏛️', 'theater-place': '🎭', stadium: '🏟️',
    university: '🎓', factory: '🏭', office: '🏢', shop: '🛒', bakery: '🥖',
    pharmacy: '💊', gym: '🏋️', 'swimming-pool': '🏊', cemetery: '🪦', 'police-station': '🚔',
    'fire-station': '🚒', embassy: '🏛️', bridge: '🌉', tower: '🗼',
    'school-place': '🏫', 'pharmacy-place': '💊', mall: '🏬', cafe: '☕',
    zoo: '🦁', port: '⚓', 'train-station': '🚉', 'bus-station': '🚌',
    'gas-station': '⛽', theater: '🎭', cinema: '🎬',

    // ========== TRANSPORTATION ==========
    car: '🚗', bus: '🚌', train: '🚆', plane: '✈️', ship: '🚢',
    boat: '⛵', bicycle: '🚲', motorcycle: '🏍️', taxi: '🚕', truck: '🚛',
    subway: '🚇', tram: '🚃', helicopter: '🚁', ambulance: '🚑',
    'ambulance-trans': '🚑', ferry: '⛴️',
    wheel: '🎡', engine: '🔧', fuel: '⛽',
    'traffic-light': '🚦', road: '🛣️', highway: '🛣️', parking: '🅿️',
    ticket: '🎫', passport: '🛂', luggage: '🧳', suitcase: '🧳',
    seat: '💺', journey: '🗺️', destination: '📍', traffic: '🚦',

    // ========== WEATHER ==========
    'rain-weather': '🌧️', 'wind-weather': '💨', 'cloud-weather': '☁️', 'snow-weather': '❄️',
    hot: '🌡️', cold: '🥶',
    sunny: '☀️', cloudy: '⛅', rainy: '🌧️', snowy: '🌨️',
    foggy: '🌫️', humid: '💧', dry: '🏜️',
    temperature: '🌡️', forecast: '📡', storm: '⛈️',
    lightning: '⚡', hail: '🌨️',
    climate: '🌍',

    // ========== TIME ==========
    day: '🌞', night: '🌜', morning: '🌅', evening: '🌆', hour: '⏰',
    week: '📅', month: '📆', year: '🗓️', today: '📌', tomorrow: '➡️',
    yesterday: '⬅️', minute: '⏱️', 'second-time': '⏱️', noon: '☀️', midnight: '🌙',
    dawn: '🌅', afternoon: '🌤️',
    now: '⏰', later: '⏳',
    always: '♾️', never: '❌',
    early: '🌅', late: '🌙',

    // ========== DAYS OF THE WEEK ==========
    sunday: '☀️', monday: '🌙', tuesday: '🔴', wednesday: '🟤', thursday: '🟢',
    friday: '🕌', saturday: '⭐',

    // ========== MONTHS ==========
    january: '❄️', february: '💝', march: '🌸', april: '🌷', may: '🌺',
    june: '☀️', july: '🏖️', august: '🌴', september: '🍂', october: '🎃',
    november: '🍁', december: '🎄',

    // ========== SEASONS ==========
    'spring-season': '🌸', summer: '☀️', autumn: '🍂', winter: '❄️',

    // ========== EMOTIONS ==========
    happy: '😊', sad: '😢', angry: '😠', scared: '😨', surprised: '😲',
    tired: '😴', excited: '🤩', bored: '😑', proud: '🥲',
    jealous: '😒', grateful: '🙏', lonely: '😔', hopeful: '🌟', confused: '😕',
    nervous: '😰', calm: '😌',
    love: '❤️', hate: '💔', worried: '😟',
    embarrassed: '😳', joy: '🎉', peace: '☮️', fear: '😨', anger: '😤',
    sadness: '😿', happiness: '😄', patience: '🤲', kindness: '💖',

    // ========== COMMON ACTIONS ==========
    eat: '🍽️', drink: '🥤', sleep: '😴', wake: '⏰', walk: '🚶',
    run: '🏃', sit: '🪑', stand: '🧍', read: '📖', write: '✍️',
    speak: '🗣️', listen: '👂', see: '👁️', hear: '👂', think: '🤔',
    know: '🧠', learn: '📚', teach: '👨‍🏫', work: '💼', play: '🎮',
    pray: '🤲', fast: '🕌', give: '🎁', take: '✋', buy: '🛒',
    sell: '💰', open: '🚪', close: '🚪', come: '🚶', go: '🚶‍♂️',
    enter: '➡️', exit: '⬅️', help: '🤝',
    ask: '❓', answer: '💬', wait: '⏳', travel: '✈️', cook: '👨‍🍳',
    clean: '🧹', wash: '🧼', drive: '🚗',
    swim: '🏊', dance: '💃', sing: '🎤', laugh: '😂', cry: '😢',
    smile: '😊',
    understand: '💡', want: '🙋', need: '❗', 'love-verb': '❤️', like: '👍',
    return: '🔄', 'fly-action': '✈️',

    // ========== ADJECTIVES ==========
    big: '📦', small: '🔹', long: '📏', short: '📐',
    new: '✨', young: '👶', beautiful: '💎', ugly: '😬',
    good: '👍', bad: '👎', 'fast-adj': '⚡', slow: '🐢', strong: '💪',
    weak: '😔', rich: '💰', poor: '😢', full: '📦', empty: '📭',
    'clean-adj': '✨', dirty: '🟤', heavy: '🏋️',
    'light-adj': '💡', easy: '✅', difficult: '❌',
    sweet: '🍬', sour: '🍋', bitter: '😖', salty: '🧂', spicy: '🌶️',
    quiet: '🤫', loud: '📢',
    'old-thing': '📜', 'old-person': '👴',
    'open-adj': '🚪', closed: '🔒', right: '✅', wrong: '❌',
    important: '⭐', possible: '✅', impossible: '🚫', famous: '🌟',
    delicious: '😋',

    // ========== SCHOOL & EDUCATION ==========
    'school-edu': '🏫', classroom: '🪑', 'teacher-edu': '👨‍🏫', 'student-edu': '👨‍🎓',
    book: '📖', pen: '🖊️', pencil: '✏️', notebook: '📓', eraser: '🧽', ruler: '📏',
    blackboard: '📋', 'desk-school': '📚',
    homework: '📚', exam: '📝', lesson: '📖', subject: '📚',
    mathematics: '🔢', science: '🔬', history: '📜', geography: '🌍',
    language: '🗣️', 'arabic-lang': '🇸🇦', 'english-lang': '🇬🇧',
    question: '❓', 'answer-noun': '💬', grade: '📊',

    // ========== SPORTS ==========
    football: '⚽', basketball: '🏀', tennis: '🎾', swimming: '🏊', running: '🏃',
    volleyball: '🏐', boxing: '🥊', wrestling: '🤼', gymnastics: '🤸',
    golf: '⛳', skiing: '⛷️', cycling: '🚴', 'horse-riding': '🏇',
    ball: '⚽', goal: '🥅', team: '👥', player: '🏃', coach: '👨‍🏫',
    referee: '🧑‍⚖️', match: '🏆', win: '🏆', lose: '😞', champion: '🏆',
    medal: '🏅', olympics: '🏅',

    // ========== MUSIC & ARTS ==========
    music: '🎵', song: '🎶', singer: '🎤', piano: '🎹',
    guitar: '🎸', violin: '🎻', drum: '🥁', flute: '🎵', oud: '🎸',
    painting: '🎨', drawing: '✏️', sculpture: '🗿', photography: '📷',
    'dance-noun': '💃', art: '🎨', 'color-noun': '🎨', brush: '🖌️', canvas: '🖼️',
    concert: '🎤', 'theater-arts': '🎭',

    // ========== TECHNOLOGY ==========
    computer: '💻', laptop: '💻', phone: '📱', smartphone: '📱', tablet: '📱',
    internet: '🌐', website: '🌐', email: '📧', password: '🔑',
    app: '📱', software: '💿', download: '⬇️', upload: '⬆️',
    screen: '🖥️', keyboard: '⌨️', printer: '🖨️', 'camera-tech': '📷',
    video: '📹', message: '💬', 'social-media': '👥',
    battery: '🔋', charger: '🔌', wifi: '📶',

    // ========== ISLAMIC TERMS ==========
    allah: '☪️', quran: '📖', salah: '🤲', sawm: '🌙', zakat: '💰',
    hajj: '🕋', shahada: '☝️', masjid: '🕌',
    'imam-islamic': '🧔', wudu: '💧', dua: '🤲', dhikr: '📿',
    jannah: '🌴', jahannam: '🔥', akhirah: '🌅',
    dunya: '🌍', tawbah: '🤲', iman: '❤️', islam: '☪️', muslim: '🕌',
    rasul: '🕌', nabi: '🕌', sunnah: '📖', hadith: '📚',
    salam: '👋', barakah: '✨', rahma: '💖', taqwa: '🤲', ihsan: '🌟',
    halal: '✅', haram: '❌', ayah: '📖', surah: '📖',
    ummah: '👥', khalifah: '👑', malaika: '👼', shaytan: '👿', jinn: '👻',
    ramadan: '🌙', eid: '🎉',

    // ========== QURANIC WORDS ==========
    rabb: '☪️', nafs: '💭', qawm: '👥', 'yawm-quranic': '🌞',
    kitab: '📚', nur: '💡', huda: '🧭', ilm: '📚',
    haqq: '✅', batil: '❌', khayr: '💚', sharr: '🔴',
    'ard-quranic': '🌍', sama: '🌌', shukr: '🙏', kufr: '❌',
    dhulm: '⚖️', adl: '⚖️', rizq: '🍞', qadr: '🌙',
    ghayb: '👁️', ayat: '📖', abd: '🤲', ibadah: '🤲',
    sirat: '🛤️', mustaqim: '➡️', falah: '🏆', khusran: '📉',
    amal: '💪', salih: '✅', muttaqin: '🤲', muminun: '🕌',
    kafirun: '❌', hayat: '🌱', mawt: '☠️', qiyamah: '⏰',
    hisab: '📊', mizan: '⚖️', fitna: '🔥',

    // ========== GREETINGS & PHRASES ==========
    'assalamu-alaykum': '👋', 'wa-alaykum-assalam': '👋',
    bismillah: '☪️', alhamdulillah: '🙏', subhanallah: '✨',
    'allahu-akbar': '☪️', inshallah: '🤲', mashallah: '✨',
    jazakallah: '🤲', barakallah: '✨',
    'sabah-alkhayr': '🌅', 'masa-alkhayr': '🌆',
    'ahlan-wa-sahlan': '👋', shukran: '🙏', afwan: '😊',
    maasalama: '👋', 'kayf-haluk': '❓', 'ana-bikhayar': '😊',
    'min-fadlak': '🙏', "na'am": '✅', la: '❌',

    // ========== DIRECTIONS ==========
    north: '⬆️', south: '⬇️', east: '➡️', west: '⬅️',
    'right-dir': '➡️', left: '⬅️', up: '⬆️', down: '⬇️',
    front: '⏩', behind: '⏪',
    inside: '📥', outside: '📤', near: '📍', far: '🔭', between: '↔️',

    // ========== COUNTRIES ==========
    'saudi-arabia': '🇸🇦', egypt: '🇪🇬', jordan: '🇯🇴', uae: '🇦🇪', qatar: '🇶🇦',
    kuwait: '🇰🇼', bahrain: '🇧🇭', oman: '🇴🇲', yemen: '🇾🇪', iraq: '🇮🇶',
    syria: '🇸🇾', lebanon: '🇱🇧', palestine: '🇵🇸', morocco: '🇲🇦', algeria: '🇩🇿',
    tunisia: '🇹🇳', libya: '🇱🇾', sudan: '🇸🇩',
    turkey: '🇹🇷', iran: '🇮🇷', pakistan: '🇵🇰', india: '🇮🇳', indonesia: '🇮🇩',
    malaysia: '🇲🇾', america: '🇺🇸', britain: '🇬🇧', france: '🇫🇷', germany: '🇩🇪',

    // ========== MATERIALS ==========
    wood: '🪵', metal: '🔩', plastic: '🧴',
    leather: '👜', cotton: '🧵', wool: '🧶', silk: '🎀',
    gold: '🥇', 'gold-material': '🥇', silver: '🥈', 'silver-material': '🥈',
    iron: '⚙️', copper: '🟤',
    stone: '🪨', paper: '📄', cloth: '🧵',

    // ========== SHAPES ==========
    circle: '⭕', square: '⬛', triangle: '🔺', rectangle: '▬', oval: '⭕',
    'diamond-shape': '🔷', 'star-shape': '⭐', 'heart-shape': '❤️',
    hexagon: '⬡', pentagon: '⬠', cube: '🧊', sphere: '⚽',
  };
  return emojiMap[wordId] || '📝';
}
