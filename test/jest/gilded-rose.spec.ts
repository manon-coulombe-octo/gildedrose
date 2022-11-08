import { Item, GildedRose } from '@/gilded-rose';

describe('Item', () => {
  it('should create an valid item', () => {
    const expectedName = 'Valid Item'
    const expectedSellIn = 0
    const expectedQuality = 1
    const item = new Item(expectedName, expectedSellIn, expectedQuality)
    
    expect(item.name).toBe(expectedName)
    expect(item.daysBeforeExpiracy).toBe(expectedSellIn)
    expect(item.quality).toBe(expectedQuality)
  })
})

describe('Gilded Rose', () => {
  it('should create a valid GildedRose', () => {
    const gildedRose = new GildedRose();
    expect(gildedRose.items).toStrictEqual([]);
  })

  describe('Daily items update with basic rules', () => {
    it('item should decrease in quality and daysBeforeExpiracy over updating', () => {
      //given
      const givenDaysBeforeExpiracy = 4
      const givenQuality = 3
      const gildedRose = new GildedRose([new Item("Valid item", givenDaysBeforeExpiracy, givenQuality)])
      //when
      gildedRose.dailyItemsUpdate()
      //then
      expect(gildedRose.items[0].daysBeforeExpiracy).toBe(givenDaysBeforeExpiracy - 1)
      expect(gildedRose.items[0].quality).toBe(givenQuality - 1)
    })

    it('dayBeforeExpiracy should decrease twice when an item have zero in quality, and quality shouldn\'t decrease', () => {
      //given
      const givenDaysBeforeExpiracy = 4
      const givenQuality = 0
      const gildedRose = new GildedRose([new Item("Valid item", givenDaysBeforeExpiracy, givenQuality)])
      //when
      gildedRose.dailyItemsUpdate()
      //then
      expect(gildedRose.items[0].daysBeforeExpiracy).toBe(givenDaysBeforeExpiracy - 2)
      expect(gildedRose.items[0].quality).toBe(givenQuality)
    })
  })

  describe('Daily items update for Aged Brie', () => {
    it('should increase quality instead of decrease', () => {
      //given
      const givenDaysBeforeExpiracy = 4
      const givenQuality = 49
      const gildedRose = new GildedRose([new Item("Aged Brie", givenDaysBeforeExpiracy, givenQuality)])
      //when
      gildedRose.dailyItemsUpdate()
      //then
      expect(gildedRose.items[0].daysBeforeExpiracy).toBe(givenDaysBeforeExpiracy - 1)
      expect(gildedRose.items[0].quality).toBe(givenQuality + 1)
    })
    it('Quality should not increase over fifty', () => {
      //given
      const givenDaysBeforeExpiracy = 4
      const givenQuality = 50
      const gildedRose = new GildedRose([new Item("Aged Brie", givenDaysBeforeExpiracy, givenQuality)])
      //when
      gildedRose.dailyItemsUpdate()
      //then
      expect(gildedRose.items[0].daysBeforeExpiracy).toBe(givenDaysBeforeExpiracy - 1)
      expect(gildedRose.items[0].quality).toBe(givenQuality)
    })
  })

  describe('Daily items update for Sulfuras, Hand of Ragnaros', () => {
      it('shound not decrease quality or dayBeforeExpiracy', () => {
      //given
      const givenDaysBeforeExpiracy = 4
      const givenQuality = 80
      const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", givenDaysBeforeExpiracy, givenQuality)])
      //when
      gildedRose.dailyItemsUpdate()
      //then
      expect(gildedRose.items[0].daysBeforeExpiracy).toBe(givenDaysBeforeExpiracy)
      expect(gildedRose.items[0].quality).toBe(givenQuality)
      })
  })

  describe('Daily items update for Backstage passes to a TAFKAL80ETC concert', () => {
    it('shound increase quality of one when dayBeforeExpiracy is over ten', () => {
      //given
      const givenDaysBeforeExpiracy = 11
      const givenQuality = 30
      const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", givenDaysBeforeExpiracy, givenQuality)])
      //when
      gildedRose.dailyItemsUpdate()
      //then
      expect(gildedRose.items[0].daysBeforeExpiracy).toBe(givenDaysBeforeExpiracy - 1)
      expect(gildedRose.items[0].quality).toBe(givenQuality + 1)
      })

    it('shound increase quality of two when dayBeforeExpiracy is between 6 and 10 included', () => {
      //given
      const givenDaysBeforeExpiracy = 9
      const givenQuality = 30
      const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", givenDaysBeforeExpiracy, givenQuality)])
      //when
      gildedRose.dailyItemsUpdate()
      //then
      expect(gildedRose.items[0].daysBeforeExpiracy).toBe(givenDaysBeforeExpiracy - 1)
      expect(gildedRose.items[0].quality).toBe(givenQuality + 2)
      })

    it('shound increase quality of one when dayBeforeExpiracy is between 1 and 5 included', () => {
      //given
      const givenDaysBeforeExpiracy = 4
      const givenQuality = 30
      const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", givenDaysBeforeExpiracy, givenQuality)])
      //when
      gildedRose.dailyItemsUpdate()
      //then
      expect(gildedRose.items[0].daysBeforeExpiracy).toBe(givenDaysBeforeExpiracy - 1)
      expect(gildedRose.items[0].quality).toBe(givenQuality + 3)
    })

      it('shound not increase quality one when the item is expired', () => {
        //given
        const givenDaysBeforeExpiracy = 0
        const givenQuality = 30
        const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", givenDaysBeforeExpiracy, givenQuality)])
        //when
        gildedRose.dailyItemsUpdate()
        //then
        expect(gildedRose.items[0].daysBeforeExpiracy).toBe(givenDaysBeforeExpiracy - 2)
        expect(gildedRose.items[0].quality).toBe(0)
      })
  })
})
