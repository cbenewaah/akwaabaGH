import type { Festival } from './types'

export const festivals: Festival[] = [
  {
    id: 'homowo',
    name: 'Homowo',
    blurb: 'the hunger-hooting festival',
    people: 'Ga people',
    region: 'Greater Accra',
    month: 'August',
    monthShort: 'AUG',
    day: '23',
    dateLabel: 'Sat 23 – Sun 31 Aug 2026',
    duration: '~1 week',
    tag: 'Harvest',
    description:
      'Homowo, meaning "hooting at hunger," is a harvest festival of the Ga people commemorating a great famine their ancestors survived. It is marked by the sprinkling of kpokpoi (a traditional maize-and-palm dish), drumming, processions, and family reunions across Accra\'s Ga townships.',
    expect:
      'Twin celebrations, colourful durbars of chiefs, traditional drumming and dance. Visitors are welcome — dress modestly and ask before photographing rituals.',
    location: 'Ga Mashie, Accra',
    live: true,
    pairsWith: 'Jamestown, Accra',
  },
  {
    id: 'asafotufiami',
    name: 'Asafotufiami',
    blurb: 'the warrior homecoming festival',
    people: 'Ada people',
    region: 'Greater Accra',
    month: 'August',
    monthShort: 'AUG',
    day: '04',
    dateLabel: 'Sat 1 Aug 2026',
    duration: '1 day',
    tag: 'Warrior',
    description:
      'A warrior festival of the people of Ada, commemorating military victories of old with a colourful durbar, mock battle re-enactments, and processions of chiefs in war regalia along the Volta estuary.',
    expect:
      'Firing of muskets, war-dance re-enactments, and a grand durbar of chiefs at Ada Foah. Arrive early for a riverside viewing spot.',
    location: 'Ada Foah, Greater Accra',
  },
  {
    id: 'akwasidae',
    name: 'Akwasidae',
    blurb: 'the Asantehene\'s grand durbar',
    people: 'Asante people',
    region: 'Ashanti',
    month: 'Rotating',
    monthShort: 'VAR',
    day: '—',
    dateLabel: 'Every 42 days · next: check calendar',
    duration: '1 day',
    tag: 'Royal',
    description:
      'A recurring Asante festival held every six weeks at Manhyia Palace, when the Asantehene appears in full regalia to receive homage from sub-chiefs, accompanied by drumming, horn-blowing, and the display of royal stools.',
    expect:
      'Public durbar at Manhyia Palace — arrive by mid-morning for a seat near the royal procession route.',
    location: 'Manhyia Palace, Kumasi',
    pairsWith: 'Manhyia Palace Museum',
  },
  {
    id: 'hogbetsotso',
    name: 'Hogbetsotso',
    blurb: 'the festival of exodus',
    people: 'Anlo Ewe',
    region: 'Volta',
    month: 'November',
    monthShort: 'NOV',
    day: '01',
    dateLabel: 'Sat 1 Nov 2026',
    duration: '1 week (durbar day)',
    tag: 'Migration',
    description:
      'Hogbetsotso ("festival of exodus") commemorates the Anlo Ewe migration from Notsie in present-day Togo, fleeing a tyrannical king. The festival features the ritual sweeping-away of the past year\'s misfortunes and a grand durbar of chiefs.',
    expect:
      'A vibrant durbar of chiefs, drumming, and the symbolic Adevu dance re-enacting the historic escape.',
    location: 'Anloga, Volta',
  },
  {
    id: 'aboakyer',
    name: 'Aboakyer',
    blurb: 'the deer-hunting festival',
    people: 'Effutu people',
    region: 'Central',
    month: 'May',
    monthShort: 'MAY',
    day: '05',
    dateLabel: 'first Sat of May',
    duration: '1 day',
    tag: 'Hunt',
    description:
      'The "deer-hunting festival" of Winneba, in which two rival Asafo companies compete to be first to capture a live bushbuck bare-handed and present it to the chief — a ritual substitute for an ancestral human sacrifice.',
    expect:
      'A dawn hunt in the bush followed by a triumphant procession and durbar in Winneba town centre.',
    location: 'Winneba, Central Region',
  },
  {
    id: 'fetu-afahye',
    name: 'Fetu Afahye',
    blurb: "Cape Coast's harvest thanksgiving",
    people: 'Oguaa (Cape Coast) people',
    region: 'Central',
    month: 'September',
    monthShort: 'SEP',
    day: '05',
    dateLabel: 'first Sat of Sep',
    duration: '1 day',
    tag: 'Harvest',
    description:
      'Cape Coast\'s biggest annual festival, giving thanks for the year\'s harvest and asking for protection in the year ahead. Chiefs parade in palanquins through the streets, trailed by asafo companies in colourful regalia.',
    expect:
      'A carnival-like procession through Cape Coast, ending in a durbar of chiefs near the castle.',
    location: 'Cape Coast, Central Region',
    pairsWith: 'Cape Coast Castle',
  },
  {
    id: 'bakatue',
    name: 'Bakatue',
    blurb: 'the opening of the fishing season',
    people: 'Edina (Elmina) people',
    region: 'Central',
    month: 'July',
    monthShort: 'JUL',
    day: '01',
    dateLabel: 'first Tue of Jul',
    duration: '1 day',
    tag: 'Harvest',
    description:
      'Marks the ceremonial opening of the Benya lagoon fishing season with a symbolic casting of nets by the chief fisherman, followed by canoe races and a durbar — the traditional curtain-raiser to Ghana\'s festival calendar.',
    expect:
      'Colourful canoe processions on the lagoon and a durbar of chiefs in Elmina town.',
    location: 'Elmina, Central Region',
    pairsWith: 'Elmina Castle',
  },
  {
    id: 'panafest',
    name: 'PANAFEST',
    blurb: 'a pan-African homecoming',
    people: 'Pan-African diaspora',
    region: 'Central',
    month: 'August',
    monthShort: 'AUG',
    day: '01',
    dateLabel: 'Biennial · late Jul – early Aug',
    duration: '~1 week',
    tag: 'Diaspora',
    description:
      'The Pan African Historical Theatre Festival brings together Africans and the diaspora for a biennial celebration of reconnection — durbars, theatre, poetry, and a candlelight vigil at Cape Coast and Elmina castles.',
    expect:
      'Emotional homecoming ceremonies, performances, and a symbolic Reverential Rites of Reunification at the coastal castles.',
    location: 'Cape Coast & Elmina, Central Region',
    pairsWith: 'Cape Coast Castle',
  },
  {
    id: 'damba',
    name: 'Damba',
    blurb: 'the Dagbon horseback procession',
    people: 'Dagbon people',
    region: 'Northern',
    month: 'Varies',
    monthShort: 'VAR',
    day: '—',
    dateLabel: 'Follows the Islamic lunar calendar',
    duration: '2 days',
    tag: 'Royal',
    description:
      'A Dagbon festival marking the birth of the Prophet Muhammad, celebrated with horse-riding displays, drumming on the traditional lunga, and a procession of chiefs on horseback through Yendi and Tamale.',
    expect:
      'Horseback processions, praise-singing griots, and a royal durbar — dates shift yearly with the lunar calendar.',
    location: 'Yendi & Tamale, Northern Region',
  },
  {
    id: 'kobine',
    name: 'Kobine',
    blurb: 'the Lawra drumming festival',
    people: 'Dagaaba people',
    region: 'Upper West',
    month: 'September',
    monthShort: 'SEP',
    day: '20',
    dateLabel: 'Late Sep, Lawra',
    duration: '1 week',
    tag: 'Harvest',
    description:
      'A harvest and thanksgiving festival of the Dagaaba people of Lawra, known for its energetic Bui drumming and dance performed by all generations — one of the most musically distinctive festivals in Ghana.',
    expect:
      'Mass drumming and dance in the town square, craft stalls, and a durbar of chiefs.',
    location: 'Lawra, Northern Region',
  },
  {
    id: 'kundum',
    name: 'Kundum',
    blurb: 'the coastal harvest procession',
    people: 'Ahanta & Nzema people',
    region: 'Western',
    month: 'September',
    monthShort: 'SEP',
    day: '10',
    dateLabel: 'Rolls Aug – Nov across towns',
    duration: '1 week per town',
    tag: 'Harvest',
    description:
      'A season of harvest festivals celebrated in turn by Ahanta and Nzema towns along the western coast, marked by an exorcism-style dance believed to drive out evil spirits before the new farming season begins.',
    expect:
      'Ritual dancing through the streets, drumming competitions between towns, and beachside durbars.',
    location: 'Axim & Ahanta towns, Western Region',
    pairsWith: 'Busua Beach',
  },
]

export const festivalMonthOrder = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function getFestival(id: string) {
  return festivals.find((f) => f.id === id)
}
