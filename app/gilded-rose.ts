export class Item {
  name: string;
  daysBeforeExpiracy: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.daysBeforeExpiracy = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  private backstageItemName = 'Backstage passes to a TAFKAL80ETC concert'
  private agedBrieItemName = 'Aged Brie'
  private sulfurasItemName = 'Sulfuras, Hand of Ragnaros'
  private conjuredItemName = 'Conjured Mana Cake'


  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  dailyItemsUpdate() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i]

      switch (currentItem.name) {
        case this.agedBrieItemName:
          this.dailyIncreaseQuality(currentItem)
          this.dailyDecreaseDaysBeforeExpiracy(currentItem)
          break

        case this.backstageItemName:
          this.manageBackstageItemQuality(currentItem)
          this.dailyDecreaseDaysBeforeExpiracy(currentItem)
          break

        case this.sulfurasItemName:
          // should resolve a bug this.setLegendaryQuality(currentItem)
          break
          
        default:
          this.dailyDecreaseQuality(currentItem)
          this.dailyDecreaseDaysBeforeExpiracy(currentItem)
          break
      }
    }
    return this.items;
  }

  manageBackstageItemQuality(item: Item) {
    if (item.daysBeforeExpiracy == 0) {
      item.quality = 0;
      return  
    }
    if (item.daysBeforeExpiracy <= 10) {
      this.dailyIncreaseQuality(item);  
    }
    if (item.daysBeforeExpiracy <= 5) {
      this.dailyIncreaseQuality(item);  
    }
      this.dailyIncreaseQuality(item);
  }

  dailyIncreaseQuality(item: Item) {
    if (item.quality < 50)
      item.quality++
  }

  private dailyDecreaseQuality(item: Item) {
    if (item.quality > 0)
      item.quality--
  }

  private dailyDecreaseDaysBeforeExpiracy(item: Item) {
    if (item.quality == 0) {
      item.daysBeforeExpiracy--
    }
    item.daysBeforeExpiracy--
  }
}
