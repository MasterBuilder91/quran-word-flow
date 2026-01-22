import { Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FlashcardWord } from '@/data/flashcardVocabulary';
import { useElevenLabsTTS } from '@/hooks/useElevenLabsTTS';

interface FlashCardProps {
  word: FlashcardWord;
  showImage?: boolean;
}

export const FlashCard = ({ word, showImage = true }: FlashCardProps) => {
  const { speak, isPlaying, isLoading } = useElevenLabsTTS();

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
            disabled={isPlaying || isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-primary animate-pulse' : ''}`} />
            )}
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
    strawberry: '🍓', mango: '🥭', pomegranate: '🍎', date: '🌴', fig: '🫐',
    pear: '🍐', peach: '🍑', apricot: '🍑', cherry: '🍒', plum: '🍑',
    lemon: '🍋', lime: '🍋', pineapple: '🍍', coconut: '🥥', kiwi: '🥝',
    melon: '🍈', cantaloupe: '🍈', papaya: '🥭', guava: '🍐', avocado: '🥑',
    blackberry: '🫐', raspberry: '🍇', blueberry: '🫐', olive: '🫒', grapefruit: '🍊',

    // ========== VEGETABLES ==========
    tomato: '🍅', potato: '🥔', onion: '🧅', garlic: '🧄', carrot: '🥕',
    cucumber: '🥒', lettuce: '🥬', cabbage: '🥬', pepper: '🫑', eggplant: '🍆',
    zucchini: '🥒', pumpkin: '🎃', spinach: '🥬', parsley: '🌿', mint: '🌿',
    celery: '🥬', broccoli: '🥦', cauliflower: '🥦', corn: '🌽', peas: '🫛',
    beans: '🫘', lentils: '🫘', chickpeas: '🫘', radish: '🥕', turnip: '🥔',
    beet: '🫒', 'sweet-potato': '🍠', ginger: '🫚', mushroom: '🍄', artichoke: '🌿',
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
    goose: '🦢', swan: '🦢', rooster: '🐓', hen: '🐔', turkey: '🦃',
    ostrich: '🦤', penguin: '🐧', flamingo: '🦩', pelican: '🦤', heron: '🦢',
    stork: '🦤', vulture: '🦅', seagull: '🐦', woodpecker: '🐦', hummingbird: '🐦',
    canary: '🐤', nightingale: '🐦', raven: '🐦‍⬛', kingfisher: '🐦',

    // ========== SEA CREATURES ==========
    fish: '🐟', whale: '🐋', dolphin: '🐬', shark: '🦈', octopus: '🐙',
    squid: '🦑', crab: '🦀', lobster: '🦞', shrimp: '🦐', oyster: '🦪',
    clam: '🦪', starfish: '⭐', jellyfish: '🪼', seal: '🦭', walrus: '🦭',
    seahorse: '🐴', eel: '🐍', stingray: '🐟', coral: '🪸', salmon: '🐟',
    tuna: '🐟', sardine: '🐟', mussel: '🦪',

    // ========== INSECTS ==========
    butterfly: '🦋', bee: '🐝', ant: '🐜', fly: '🪰', mosquito: '🦟',
    spider: '🕷️', beetle: '🪲', grasshopper: '🦗', locust: '🦗', cricket: '🦗',
    cockroach: '🪳', dragonfly: '🪰', ladybug: '🐞', caterpillar: '🐛', worm: '🪱',
    snail: '🐌', scorpion: '🦂', wasp: '🐝', moth: '🦋', flea: '🦟',

    // ========== HOME & FURNITURE ==========
    house: '🏠', door: '🚪', window: '🪟', table: '🪑', chair: '🪑',
    bed: '🛏️', room: '🛋️', key: '🔑', lamp: '💡', mirror: '🪞',
    sofa: '🛋️', carpet: '🧶', curtain: '🪟', ceiling: '⬆️', floor: '⬇️',
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
    underwear: '🩲', bra: '👙', swimsuit: '👙', pajamas: '😴', robe: '🥋',
    vest: '🦺', raincoat: '🧥', uniform: '👔', apron: '👨‍🍳', watch: '⌚',
    glasses: '👓', sunglasses: '🕶️', ring: '💍', necklace: '📿', bracelet: '📿',
    earrings: '💎', purse: '👛', wallet: '👝', backpack: '🎒', umbrella: '☂️',

    // ========== BODY PARTS ==========
    head: '🗣️', eye: '👁️', ear: '👂', nose: '👃', mouth: '👄',
    hand: '🤚', foot: '🦶', heart: '❤️', finger: '☝️', tongue: '👅',
    hair: '💇', face: '😊', tooth: '🦷', lip: '👄', neck: '🦢',
    shoulder: '🙆', arm: '💪', leg: '🦵', knee: '🦵', back: '🔙',
    stomach: '🤰', chest: '🫁', brain: '🧠', blood: '🩸', bone: '🦴',
    skin: '🖐️', muscle: '💪', nail: '💅', eyebrow: '🤨', eyelash: '👁️',
    beard: '🧔', mustache: '👨', elbow: '💪', wrist: '⌚', palm: '🖐️',
    thumb: '👍', ankle: '🦶', heel: '🦶', toe: '🦶', waist: '👗',
    hip: '🧍', liver: '🫀', kidney: '🫘', lung: '🫁', cheek: '😊',
    chin: '🗣️', forehead: '🧠',

    // ========== HEALTH & MEDICINE ==========
    doctor: '👨‍⚕️', nurse: '👩‍⚕️', patient: '🤒', 'hospital-health': '🏥', medicine: '💊',
    pill: '💉', injection: '💉', bandage: '🩹', thermometer: '🌡️', stethoscope: '🩺',
    'x-ray': '☠️', surgery: '🏥', disease: '🦠', fever: '🤒', cough: '😷',
    headache: '🤕', pain: '😣', allergy: '🤧', virus: '🦠', 'pharmacy-health': '💊',
    'ambulance-health': '🚑', wheelchair: '🦽', crutches: '🩼', prescription: '📝', vaccine: '💉',

    // ========== NATURE ==========
    sun: '☀️', moon: '🌙', star: '⭐', sky: '🌤️', water: '💧',
    tree: '🌳', flower: '🌸', mountain: '⛰️', sea: '🌊', river: '🏞️',
    earth: '🌍', fire: '🔥', air: '💨', rain: '🌧️', cloud: '☁️',
    snow: '❄️', wind: '💨', thunder: '⚡', rainbow: '🌈', desert: '🏜️',
    forest: '🌲', ocean: '🌊', lake: '🏞️', island: '🏝️', valley: '🏞️',
    hill: '⛰️', rock: '🪨', sand: '🏖️', grass: '🌿', leaf: '🍃',
    branch: '🌿', root: '🌱', seed: '🌱', soil: '🟤', mud: '🟤',
    wave: '🌊', sunrise: '🌅', sunset: '🌇', horizon: '🌅',

    // ========== FOOD & DRINK ==========
    bread: '🍞', rice: '🍚', meat: '🥩', milk: '🥛', egg: '🥚',
    cheese: '🧀', honey: '🍯', tea: '🍵', coffee: '☕', sugar: '🧂',
    salt: '🧂', butter: '🧈', oil: '🛢️', soup: '🍲', salad: '🥗',
    pizza: '🍕', burger: '🍔', sandwich: '🥪', pasta: '🍝', 'chicken-food': '🍗',
    'fish-food': '🐟', cake: '🎂', chocolate: '🍫', ice: '🧊', 'ice-cream': '🍦',
    juice: '🧃', soda: '🥤', 'water-drink': '💧', yogurt: '🥛', cereal: '🥣',
    nuts: '🥜', dates: '🌴', falafel: '🧆', hummus: '🫕', kebab: '🍢',

    // ========== SPICES & HERBS ==========
    'salt-spice': '🧂', 'pepper-spice': '🌶️', cinnamon: '🟤', cumin: '🟡', turmeric: '🟡',
    saffron: '🟠', cardamom: '🟢', clove: '🟤', nutmeg: '🟤', coriander: '🌿',
    basil: '🌿', oregano: '🌿', thyme: '🌿', rosemary: '🌿', sage: '🌿',
    dill: '🌿', 'bay-leaf': '🍃', 'chili-pepper': '🌶️', paprika: '🌶️', 'curry-powder': '🟡',

    // ========== COLORS ==========
    red: '🔴', blue: '🔵', green: '🟢', yellow: '🟡', white: '⚪',
    black: '⚫', 'orange-color': '🟠', purple: '🟣', brown: '🟤', pink: '💗',
    gray: '⚫', 'gold-color': '🥇', 'silver-color': '🥈', beige: '🟤', 'light-blue': '🔵',
    'dark-green': '🟢', maroon: '🔴', navy: '🔵', turquoise: '🔵', violet: '🟣',
    cream: '⚪', tan: '🟤',

    // ========== NUMBERS ==========
    one: '1️⃣', two: '2️⃣', three: '3️⃣', four: '4️⃣', five: '5️⃣',
    six: '6️⃣', seven: '7️⃣', eight: '8️⃣', nine: '9️⃣', ten: '🔟',
    zero: '0️⃣', eleven: '1️⃣', twelve: '1️⃣', twenty: '2️⃣', thirty: '3️⃣',
    forty: '4️⃣', fifty: '5️⃣', sixty: '6️⃣', seventy: '7️⃣', eighty: '8️⃣',
    ninety: '9️⃣', hundred: '💯', thousand: '🔢', million: '🔢', half: '½',
    quarter: '¼', third: '⅓',

    // ========== ORDINAL NUMBERS ==========
    first: '🥇', second: '🥈', 'third-ord': '🥉', 'fourth-ord': '4️⃣', 'fifth-ord': '5️⃣',
    'sixth-ord': '6️⃣', 'seventh-ord': '7️⃣', 'eighth-ord': '8️⃣', 'ninth-ord': '9️⃣', 'tenth-ord': '🔟',

    // ========== FAMILY ==========
    father: '👨', mother: '👩', son: '👦', daughter: '👧', brother: '👬',
    sister: '👭', grandfather: '👴', grandmother: '👵', uncle: '👨', aunt: '👩',
    cousin: '🧑', nephew: '👦', niece: '👧', husband: '👨', wife: '👩',
    baby: '👶', child: '🧒', 'teenager-family': '🧑', adult: '🧑', parents: '👫',
    family: '👨‍👩‍👧‍👦', 'twins-family': '👯', stepfather: '👨', stepmother: '👩', 'in-laws': '👫',

    // ========== PROFESSIONS ==========
    teacher: '👨‍🏫', 'doctor-prof': '👨‍⚕️', engineer: '👷', lawyer: '⚖️', judge: '⚖️',
    pilot: '👨‍✈️', farmer: '👨‍🌾', chef: '👨‍🍳', police: '👮', firefighter: '👨‍🚒',
    soldier: '💂', artist: '👨‍🎨', musician: '🎵', writer: '✍️', journalist: '📰',
    photographer: '📷', architect: '🏛️', scientist: '🔬', accountant: '🧮', manager: '💼',
    secretary: '📋', programmer: '💻', mechanic: '🔧', electrician: '⚡', plumber: '🔧',
    carpenter: '🪚', tailor: '🪡', barber: '💈', dentist: '🦷', pharmacist: '💊',
    veterinarian: '🐾', translator: '🌐', imam: '🕌', businessman: '💼', shopkeeper: '🏪',

    // ========== PLACES ==========
    city: '🏙️', village: '🏘️', mosque: '🕌', school: '🏫', market: '🏪',
    hospital: '🏥', street: '🛣️', garden: '🌷', library: '📚', airport: '✈️',
    hotel: '🏨', restaurant: '🍽️', bank: '🏦', 'post-office': '📮', station: '🚉',
    park: '🌳', beach: '🏖️', museum: '🏛️', 'theater-place': '🎭', stadium: '🏟️',
    university: '🎓', factory: '🏭', office: '🏢', shop: '🛒', bakery: '🥖',
    pharmacy: '💊', gym: '🏋️', 'swimming-pool': '🏊', cemetery: '🪦', 'police-station': '🚔',
    'fire-station': '🚒', embassy: '🏛️', border: '🛂', bridge: '🌉', tower: '🗼',

    // ========== TRANSPORTATION ==========
    car: '🚗', bus: '🚌', train: '🚆', plane: '✈️', ship: '🚢',
    boat: '⛵', bicycle: '🚲', motorcycle: '🏍️', taxi: '🚕', truck: '🚛',
    subway: '🚇', tram: '🚃', helicopter: '🚁', rocket: '🚀', ambulance: '🚑',
    'fire-truck': '🚒', 'police-car': '🚓', wheel: '🎡', engine: '🔧', fuel: '⛽',
    'gas-station': '⛽', 'traffic-light': '🚦', road: '🛣️', highway: '🛣️', parking: '🅿️',
    ticket: '🎫', passport: '🛂', luggage: '🧳', suitcase: '🧳', map: '🗺️',

    // ========== WEATHER ==========
    'rain-weather': '🌧️', 'wind-weather': '💨', 'cloud-weather': '☁️', 'snow-weather': '❄️', 'hot-weather': '🌡️',
    'cold-weather': '🥶', sunny: '☀️', cloudy: '⛅', stormy: '⛈️', foggy: '🌫️',
    humid: '💧', 'dry-weather': '🏜️', temperature: '🌡️', forecast: '📡', storm: '⛈️',
    lightning: '⚡', hail: '🌨️', frost: '❄️', 'heat-wave': '🔥', breeze: '🌬️',

    // ========== TIME ==========
    day: '🌞', night: '🌜', morning: '🌅', evening: '🌆', hour: '⏰',
    week: '📅', month: '📆', year: '🗓️', today: '📌', tomorrow: '➡️',
    yesterday: '⬅️', minute: '⏱️', 'second-time': '⏱️', noon: '☀️', midnight: '🌙',
    dawn: '🌅', dusk: '🌇', afternoon: '🌤️', weekend: '🎉', holiday: '🎊',
    century: '📜', decade: '🔟', now: '⏰', later: '⏳', soon: '⏳',
    always: '♾️', never: '❌', sometimes: '🔄', usually: '📊', early: '🌅', late: '🌙',

    // ========== DAYS OF THE WEEK ==========
    sunday: '☀️', monday: '🌙', tuesday: '🔴', wednesday: '🟤', thursday: '🟢',
    friday: '🕌', saturday: '⭐',

    // ========== MONTHS ==========
    january: '❄️', february: '💝', march: '🌸', april: '🌷', 'may-month': '🌺',
    june: '☀️', july: '🏖️', august: '🌴', september: '🍂', october: '🎃',
    november: '🍁', december: '🎄',
    muharram: '🕌', safar: '🕌', 'rabi-awwal': '🕌', 'rabi-thani': '🕌',
    'jumada-awwal': '🕌', 'jumada-thani': '🕌', rajab: '🕌', shaban: '🕌',
    ramadan: '🌙', shawwal: '🎉', 'dhul-qadah': '🕌', 'dhul-hijjah': '🕋',

    // ========== SEASONS ==========
    spring: '🌸', summer: '☀️', autumn: '🍂', winter: '❄️',

    // ========== EMOTIONS ==========
    happy: '😊', sad: '😢', angry: '😠', scared: '😨', surprised: '😲',
    tired: '😴', hungry: '😋', thirsty: '🥤', love: '❤️', hate: '💔',
    worried: '😟', excited: '🤩', bored: '😑', proud: '🥲', shy: '😳',
    jealous: '😒', grateful: '🙏', lonely: '😔', hopeful: '🌟', confused: '😕',
    nervous: '😰', calm: '😌', anxious: '😥', peaceful: '☮️', content: '😊',

    // ========== COMMON ACTIONS ==========
    eat: '🍽️', drink: '🥤', sleep: '😴', wake: '⏰', walk: '🚶',
    run: '🏃', sit: '🪑', stand: '🧍', read: '📖', write: '✍️',
    speak: '🗣️', listen: '👂', see: '👁️', hear: '👂', think: '🤔',
    know: '🧠', learn: '📚', teach: '👨‍🏫', work: '💼', play: '🎮',
    pray: '🤲', fast: '🕌', give: '🎁', take: '✋', buy: '🛒',
    sell: '💰', open: '🚪', close: '🚪', come: '🚶', go: '🚶‍♂️',
    enter: '➡️', exit: '⬅️', start: '▶️', finish: '⏹️', help: '🤝',
    ask: '❓', answer: '💬', wait: '⏳', travel: '✈️', cook: '👨‍🍳',
    clean: '🧹', wash: '🧼', wear: '👔', drive: '🚗', 'fly-action': '✈️',
    swim: '🏊', dance: '💃', sing: '🎤', laugh: '😂', cry: '😢',
    smile: '😊', hug: '🤗', kiss: '💋', marry: '💒', die: '☠️',
    live: '🏠', grow: '🌱', build: '🏗️', 'break-action': '💔', fix: '🔧',

    // ========== ADJECTIVES ==========
    big: '📦', small: '🔹', tall: '📏', short: '📐', long: '📏',
    new: '✨', old: '📜', young: '👶', beautiful: '💎', ugly: '😬',
    good: '👍', bad: '👎', 'fast-adj': '⚡', slow: '🐢', strong: '💪',
    weak: '😔', rich: '💰', poor: '😢', full: '📦', empty: '📭',
    'clean-adj': '✨', dirty: '🟤', wet: '💧', dry: '🏜️', heavy: '🏋️',
    light: '💡', hard: '🪨', soft: '☁️', 'hot-adj': '🔥', 'cold-adj': '❄️',
    sweet: '🍬', sour: '🍋', bitter: '😖', salty: '🧂', spicy: '🌶️',
    quiet: '🤫', loud: '📢', bright: '☀️', dark: '🌑', thick: '📚',
    thin: '📄', wide: '↔️', narrow: '↕️', deep: '🕳️', shallow: '🌊',
    near: '📍', far: '🔭', high: '⬆️', low: '⬇️', 'right-adj': '➡️',
    'left-adj': '⬅️', same: '🟰', different: '🔀', easy: '✅', difficult: '❌',

    // ========== SCHOOL & EDUCATION ==========
    'school-building': '🏫', classroom: '🪑', student: '👨‍🎓', 'teacher-edu': '👨‍🏫', book: '📖',
    pen: '🖊️', pencil: '✏️', notebook: '📓', 'backpack-school': '🎒', 'desk-school': '📚',
    blackboard: '📋', chalk: '🖍️', eraser: '🧽', ruler: '📏', scissors: '✂️',
    paper: '📄', exam: '📝', homework: '📚', lesson: '📖', subject: '📚',
    math: '🔢', science: '🔬', history: '📜', geography: '🌍', arabic: '🇸🇦',
    english: '🇬🇧', art: '🎨', music: '🎵', 'physical-education': '🏃', computer: '💻',
    graduation: '🎓', certificate: '📜', degree: '🎓', knowledge: '🧠', education: '📚',

    // ========== SPORTS ==========
    football: '⚽', basketball: '🏀', tennis: '🎾', swimming: '🏊', running: '🏃',
    volleyball: '🏐', boxing: '🥊', wrestling: '🤼', karate: '🥋', judo: '🥋',
    golf: '⛳', hockey: '🏒', skiing: '⛷️', cycling: '🚴', 'horse-riding': '🏇',
    archery: '🏹', fencing: '🤺', gymnastics: '🤸', weightlifting: '🏋️', 'table-tennis': '🏓',
    badminton: '🏸', 'cricket-sport': '🏏', rugby: '🏉', 'ice-skating': '⛸️', diving: '🤿',
    surfing: '🏄', rowing: '🚣', sailing: '⛵', climbing: '🧗', hiking: '🥾',

    // ========== MUSIC & ARTS ==========
    'music-general': '🎵', song: '🎶', singer: '🎤', instrument: '🎹', piano: '🎹',
    guitar: '🎸', violin: '🎻', drum: '🥁', flute: '🎵', oud: '🎸',
    painting: '🎨', drawing: '✏️', sculpture: '🗿', 'photography-art': '📷', theater: '🎭',
    'dance-art': '💃', ballet: '🩰', opera: '🎭', concert: '🎤', orchestra: '🎼',
    calligraphy: '✒️', pottery: '🏺', weaving: '🧵', embroidery: '🪡', cinema: '🎬',
    film: '🎬', actor: '🎭', director: '🎬', stage: '🎭', audience: '👥',

    // ========== TECHNOLOGY ==========
    'computer-tech': '💻', laptop: '💻', phone: '📱', tablet: '📱', internet: '🌐',
    website: '🌐', email: '📧', software: '💿', hardware: '🖥️', keyboard: '⌨️',
    'mouse-tech': '🖱️', screen: '🖥️', printer: '🖨️', camera: '📷', video: '📹',
    bluetooth: '🔵', wifi: '📶', battery: '🔋', charger: '🔌', usb: '🔌',
    app: '📱', download: '⬇️', upload: '⬆️', file: '📁', folder: '📂',
    password: '🔑', search: '🔍', message: '💬', social: '👥', robot: '🤖',
    'artificial-intelligence': '🧠', 'cloud-tech': '☁️', data: '📊', programming: '💻', server: '🖥️',

    // ========== ISLAMIC TERMS ==========
    allah: '☪️', quran: '📖', prophet: '🕌', islam: '☪️', muslim: '🕌',
    salah: '🤲', zakat: '💰', sawm: '🌙', hajj: '🕋', shahada: '☝️',
    wudu: '💧', ghusl: '🚿', 'mosque-islamic': '🕌', minaret: '🕌', mihrab: '🕌',
    minbar: '🕌', 'imam-islamic': '🧔', muezzin: '📢', adhan: '📢', iqamah: '🕌',
    rakah: '🤲', sujud: '🤲', ruku: '🤲', dua: '🤲', dhikr: '📿',
    tasbih: '📿', halal: '✅', haram: '❌', sunnah: '📖', hadith: '📚',
    'eid-term': '🎉', jummah: '🕌', kaaba: '🕋', mecca: '🕋', medina: '🕌',

    // ========== QURANIC WORDS ==========
    rab: '☪️', ilah: '☪️', rahman: '❤️', rahim: '💖', malik: '👑',
    nur: '💡', huda: '🧭', sabr: '🤲', shukr: '🙏', tawba: '🤲',
    iman: '❤️', taqwa: '🤲', jannah: '🌴', nar: '🔥', malak: '👼',
    jinn: '👻', shaytan: '👿', nafs: '💭', ruh: '💨', qalb: '❤️',
    'aql-quran': '🧠', 'ilm-quran': '📚', hikma: '🦉', ayah: '📖', surah: '📖',
    kitab: '📚', risalah: '📜', nabi: '🕌', rasul: '🕌', ummah: '👥',
    khalifah: '👑', 'ibadah-quran': '🤲', khushu: '🤲', birr: '💖', sidq: '✅',

    // ========== GREETINGS & PHRASES ==========
    'salam-greeting': '👋', 'marhaba-greeting': '👋', 'ahlan-greeting': '👋', 'shukran-greeting': '🙏', 'afwan-greeting': '😊',
    'naam-greeting': '✅', 'laa-greeting': '❌', 'min-fadlak': '🙏', 'law-samaht': '🙏', 'maasalama': '👋',
    'sabah-alkhayr': '🌅', 'masaa-alkhayr': '🌆', 'layla-saida': '🌙', 'kayf-haluk': '❓', 'ana-bikhair': '😊',
    'inshallah-greeting': '🤲', 'mashallah-greeting': '✨', 'alhamdulillah-greeting': '🙏', 'bismillah-greeting': '☪️', 'jazakallah': '🤲',
    'barakallah': '✨', 'allahu-akbar': '☪️', 'subhanallah': '✨', 'astaghfirullah': '🤲', 'lahawla': '🤲',

    // ========== DIRECTIONS ==========
    north: '⬆️', south: '⬇️', east: '➡️', west: '⬅️', right: '➡️',
    left: '⬅️', up: '⬆️', down: '⬇️', front: '⏩', 'back-dir': '⏪',
    inside: '📥', outside: '📤', above: '⬆️', below: '⬇️', between: '↔️',
    beside: '↔️', behind: '⏪', 'in-front': '⏩', here: '📍', there: '📍',
    'near-dir': '📍', 'far-dir': '🔭', straight: '⬆️', around: '🔄', through: '➡️',
    across: '↔️', corner: '📐', center: '⭕', edge: '📐', middle: '⭕',

    // ========== COUNTRIES ==========
    'saudi-arabia': '🇸🇦', egypt: '🇪🇬', jordan: '🇯🇴', uae: '🇦🇪', qatar: '🇶🇦',
    kuwait: '🇰🇼', bahrain: '🇧🇭', oman: '🇴🇲', yemen: '🇾🇪', iraq: '🇮🇶',
    syria: '🇸🇾', lebanon: '🇱🇧', palestine: '🇵🇸', morocco: '🇲🇦', algeria: '🇩🇿',
    tunisia: '🇹🇳', libya: '🇱🇾', sudan: '🇸🇩', somalia: '🇸🇴', mauritania: '🇲🇷',
    'turkey-country': '🇹🇷', iran: '🇮🇷', pakistan: '🇵🇰', india: '🇮🇳', indonesia: '🇮🇩',
    malaysia: '🇲🇾', 'united-states': '🇺🇸', 'united-kingdom': '🇬🇧', france: '🇫🇷', germany: '🇩🇪',
    china: '🇨🇳', japan: '🇯🇵', australia: '🇦🇺', canada: '🇨🇦', brazil: '🇧🇷',

    // ========== MATERIALS ==========
    wood: '🪵', metal: '🔩', 'glass-material': '🪟', plastic: '🧴', 'paper-material': '📄',
    leather: '👜', cotton: '🧵', wool: '🧶', silk: '🎀', gold: '🥇',
    silver: '🥈', iron: '⚙️', steel: '🔩', copper: '🟤', aluminum: '🔩',
    stone: '🪨', marble: '🪨', brick: '🧱', cement: '🏗️', concrete: '🧱',
    rubber: '🔴', fabric: '🧵', clay: '🟤', ceramic: '🏺', porcelain: '🏺',
    diamond: '💎', crystal: '💎', bronze: '🥉', tin: '🥫', lead: '⚫',

    // ========== SHAPES ==========
    circle: '⭕', square: '⬛', triangle: '🔺', rectangle: '▬', oval: '⭕',
    'diamond-shape': '🔷', 'star-shape': '⭐', 'heart-shape': '❤️', arrow: '➡️', cross: '✖️',
    line: '➖', curve: '〰️', angle: '📐', cube: '🧊', sphere: '⚽',
    pyramid: '🔺', cylinder: '🧪', cone: '🔻', spiral: '🌀', hexagon: '⬡',
  };
  return emojiMap[wordId] || '📝';
}
