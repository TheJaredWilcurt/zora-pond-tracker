<template>
  <div>
    <header>
      <h1>
        Zora Pond<br>
        Item Tracker
      </h1>
      <h2>
        For Dungeons of Infinity
        <span class="select-wrapper">
          <select v-model="version" class="pixel-corners">
            <option version="1.2.0">1.2.0</option>
            <option version="1.1.6">1.1.6</option>
          </select>
        </span>
      </h2>
    </header>

    <h3>Your Inventory:</h3>
    <section>
      <InventoryItem
        v-for="(gemAmount, gemColor) in inventory.gems"
        v-model="inventory.gems[gemColor]"
        :alt="gemColor + ' colored gem'"
        :src="'/zora-pond-tracker/sprites/' + version + '/gem-' + gemColor + '.png'"
        :version="version"
        :key="gemColor"
      />
      <InventoryItem v-model="inventory.bag"    alt="Bag"    :min="1" :max="3" :version="version" />
      <InventoryItem v-model="inventory.tunic"  alt="Tunic"  :min="1" :max="4" :version="version" />
      <InventoryItem v-model="inventory.sword"  alt="Sword"           :max="6" :version="version" />
      <InventoryItem v-model="inventory.shield" alt="Shield"          :max="4" :version="version" />
      <InventoryItem v-model="inventory.gloves" alt="Gloves"          :max="3" :version="version" />
      <InventoryItem v-model="inventory.bow"    alt="Bow"             :max="2" :version="version" />

      <div>
        <span
          v-for="(bool, item) in inventoryBooleans"
          class="sub-item-wrapper"
          :key="'booleans-' + item"
        >
          <img
            :alt="titleCase(item)"
            class="sub-item pixel-corners pointer"
            :data-selected="bool"
            role="button"
            tabindex="0"
            :src="'/zora-pond-tracker/sprites/' + version + '/' + item + '.png'"
            @click="inventory.booleans[item] = !inventory.booleans[item]"
            @keydown.prevent.space="inventory.booleans[item] = !inventory.booleans[item]"
            @keyup.prevent.enter="inventory.booleans[item] = !inventory.booleans[item]"
          />
        </span>
      </div>
    </section>

    <h3>Possible Rewards</h3>
    <section>
      <div class="filters">
        <CheckBox v-model="inventory.filters.showAvailable">Show Available</CheckBox>
        <CheckBox v-model="inventory.filters.showUnavailable">Show Unavailable</CheckBox>
        <CheckBox v-model="inventory.filters.showRupees">Show Rupees</CheckBox>
        <span
          v-for="(bool, item) in inventory.filters.gems"
          class="sub-item-wrapper"
          :key="'sub-item-' + item"
        >
          <img
            :alt="titleCase(item + '-gem')"
            class="sub-item small pixel-corners pointer"
            :data-selected="bool"
            role="button"
            tabindex="0"
            :src="'/zora-pond-tracker/sprites/' + version + '/gem-' + item + '.png'"
            @click="inventory.filters.gems[item] = !inventory.filters.gems[item]"
            @keydown.prevent.space="inventory.filters.gems[item] = !inventory.filters.gems[item]"
            @keyup.prevent.enter="inventory.filters.gems[item] = !inventory.filters.gems[item]"
          />
        </span>
      </div>
      <ItemPrize
        v-for="gemCombo in prizePool"
        :inventory="inventory"
        :gemA="gemCombo.gemA"
        :gemB="gemCombo.gemB"
        :prize="gemCombo.prize"
        :amount="gemCombo.amount"
        :version="version"
      />
    </section>

    <h3>Guides</h3>
    <section>
      <div class="guide">
        <h4>Dwarven Maze</h4>
        <a
          class="guide-link"
          href="/zora-pond-tracker/dwarven-maze.jpg"
          target="_blank"
        >
          <img
            alt="Dwarven Maze Map"
            class="guide-image pixel-corners"
            :src="'/zora-pond-tracker/dwarven-maze.jpg'"
          />
        </a>
      </div>

      <div class="guide">
        <h4>Kinstone Rewards</h4>
        <a
          class="guide-link"
          :href="'/zora-pond-tracker/kinstone-guide-' + version + '.png'"
          target="_blank"
        >
          <img
            alt="Dwarven Maze Map"
            class="guide-image pixel-corners"
            :src="'/zora-pond-tracker/kinstone-guide-' + version + '.png'"
          />
        </a>
      </div>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import CheckBox from '@/components/CheckBox.vue';
import InventoryItem from '@/components/InventoryItem.vue';
import ItemPrize from '@/components/ItemPrize.vue';
import NumberField from '@/components/NumberField.vue';

import { titleCase } from '@/helpers/index.js';

export default {
  components: {
    CheckBox,
    ItemPrize,
    InventoryItem,
    NumberField
  },
  data: function () {
    return {
      version: '1.1.6',
      inventory: {
        filters: {
          showAvailable: true,
          showUnavailable: false,
          showRupees: true,
          gems: {
            pink: true,
            purple: true,
            yellow: true,
            cyan: true,
            green: true,
            white: true,
            red: true,
            blue: true,
            black: true
          }
        },
        bag: 1,
        bow: 0,
        gloves: 0,
        shield: 0,
        sword: 1,
        tunic: 1,
        booleans: {
          'quiver': false,
          'bomb-bag': false,
          'food-bag': false,
          'gem-bag': false,
          'pendant-bag': false,
          'cape': false,
          'lamp': false,
          'pendant-of-cures': false,
          'pendant-of-direction': false,
          'pendant-of-health': false,
          'pendant-of-magic': false,
          'pendant-of-protection': false,
          'pendant-of-revival': false,
          'pendant-of-secrets': false,
          'pendant-of-wealth': false,
          'rod-of-bombs': false,
          'rod-of-fire': false,
          'rod-of-hearts': false,
          'rod-of-ice': false,
          'rod-of-rupees': false,
          'rod-of-stone': false,
          'ring-of-arrows': false,
          'ring-of-bombs': false,
          'ring-of-hearts': false,
          'ring-of-rupees': false
        },
        gems: {
          pink: 0,
          purple: 0,
          yellow: 0,
          cyan: 0,
          green: 0,
          white: 0,
          red: 0,
          blue: 0,
          black: 0
        }
      }
    };
  },
  methods: {
    titleCase
  },
  computed: {
    inventoryBooleans: function () {
      const booleans = {
        ...this.inventory.booleans
      };
      if (this.version === '1.1.6') {
        delete booleans['food-bag'];
        delete booleans['pendant-bag'];
      }
      if (this.version === '1.2.0') {
        delete booleans['cape'];
        delete booleans['lamp'];
      }
      return booleans;
    },
    prizePool: function () {
      const redRed = {
        gemA: 'red',
        gemB: 'red',
        prize: 'heart'
      };
      const blackBlack = {
        gemA: 'black',
        gemB: 'black',
        prize: this.swordPrize
      };
      const blueBlue = {
        gemA: 'blue',
        gemB: 'blue',
        prize: this.inventoryPrize
      };
      if (this.version === '1.2.0') {
        blueBlue.prize = this.shieldPrize;
      }
      const blackYellow = {
        gemA: 'black',
        gemB: 'yellow',
        prize: 'pendant-of-cures'
      };
      const blackWhite = {
        gemA: 'black',
        gemB: 'white',
        prize: 'pendant-of-revival'
      };
      const blackPurple = {
        gemA: 'black',
        gemB: 'purple',
        prize: 'pendant-of-direction'
      };
      const blackCyan = {
        gemA: 'black',
        gemB: 'cyan',
        prize: 'pendant-of-protection'
      };
      const redBlue = {
        gemA: 'red',
        gemB: 'blue',
        prize: 'cape'
      };
      const blackGreen = {
        gemA: 'black',
        gemB: 'green',
        prize: 'pendant-of-wealth'
      };
      const whiteBlue = {
        gemA: 'white',
        gemB: 'blue',
        prize: this.shieldPrize
      };
      const whiteRed = {
        gemA: 'white',
        gemB: 'red',
        prize: this.glovePrize
      };
      const greenBlue = {
        gemA: 'green',
        gemB: 'blue',
        prize: this.tunicPrize
      };
      const purpleGreen = {
        gemA: 'purple',
        gemB: 'green',
        prize: 'potion-pink'
      };
      const cyanBlue = {
        gemA: 'cyan',
        gemB: 'blue',
        prize: 'bomb-bag'
      };
      const greenRed = {
        gemA: 'green',
        gemB: 'red',
        prize: 'gem-bag'
      };
      const purpleRed = {
        gemA: 'purple',
        gemB: 'red',
        prize: 'rod-of-hearts'
      };
      const greenGreen = {
        gemA: 'green',
        gemB: 'green',
        prize: 'rod-of-rupees'
      };
      const greenWhite = {
        gemA: 'green',
        gemB: 'white',
        prize: 'ring-of-rupees'
      };
      const yellowBlue = {
        gemA: 'yellow',
        gemB: 'blue',
        prize: 'lamp'
      };
      const pinkBlue = {
        gemA: 'pink',
        gemB: 'blue',
        prize: 'potion-blue'
      };
      const whiteWhite = {
        gemA: 'white',
        gemB: 'white',
        prize: this.bowPrize
      };
      const cyanRed = {
        gemA: 'cyan',
        gemB: 'red',
        prize: 'quiver'
      };
      const purpleWhite = {
        gemA: 'purple',
        gemB: 'white',
        prize: 'ring-of-hearts'
      };
      const yellowWhite = {
        gemA: 'yellow',
        gemB: 'white',
        prize: 'ring-of-arrows'
      };
      const cyanWhite = {
        gemA: 'cyan',
        gemB: 'white',
        prize: 'ring-of-bombs'
      };
      const cyanGreen = {
        gemA: 'cyan',
        gemB: 'green',
        prize: 'rod-of-bombs'
      };
      const pinkRed = {
        gemA: 'pink',
        gemB: 'red',
        prize: 'potion-red'
      };
      const purplePurple = {
        gemA: 'purple',
        gemB: 'purple',
        prize: 'fairy-orb'
      };
      const pinkWhite = {
        gemA: 'pink',
        gemB: 'white',
        prize: 'potion-white'
      };
      const cyanCyan = {
        gemA: 'cyan',
        gemB: 'cyan',
        prize: 'ice-orb',
        amount: 5
      };
      const yellowYellow = {
        gemA: 'yellow',
        gemB: 'yellow',
        prize: 'fire-orb',
        amount: 4
      };
      const blackRed = {
        gemA: 'black',
        gemB: 'red',
        prize: 'pendant-of-health'
      };
      const blackBlue = {
        gemA: 'black',
        gemB: 'blue',
        prize: 'pendant-of-secrets'
      };
      const blackPink = {
        gemA: 'black',
        gemB: 'pink',
        prize: 'pendant-of-magic'
      };
      const purpleBlue = {
        gemA: 'purple',
        gemB: 'blue',
        prize: 'rod-of-ice'
      };
      const yellowGreen = {
        gemA: 'yellow',
        gemB: 'green',
        prize: 'rod-of-stone'
      };
      const yellowRed = {
        gemA: 'yellow',
        gemB: 'red',
        prize: 'rod-of-fire'
      };
      const purpleCyan = {
        gemA: 'purple',
        gemB: 'cyan',
        prize: 'bomb',
        amount: 10
      };
      const pinkGreen = {
        gemA: 'pink',
        gemB: 'green',
        prize: 'potion-green'
      };
      const yellowCyan = {
        gemA: 'yellow',
        gemB: 'cyan',
        prize: 'magic',
        amount: 2
      };
      const pinkCyan = {
        gemA: 'pink',
        gemB: 'cyan',
        prize: 'food-burger',
        amount: 2
      };
      const pinkYellow = {
        gemA: 'pink',
        gemB: 'yellow',
        prize: 'can',
        amount: 3
      };
      const pinkPurple = {
        gemA: 'pink',
        gemB: 'purple',
        prize: 'food-muffin',
        amount: 2
      };
      const pinkPink = {
        gemA: 'pink',
        gemB: 'pink',
        prize: 'can',
        amount: 2
      };
      const purpleYellow = {
        gemA: 'purple',
        gemB: 'yellow',
        prize: 'arrows',
        amount: 60
      };

      let arrows = purpleYellow;
      let bomb = purpleCyan;
      let bombBag = cyanBlue;
      let bow = whiteWhite;
      let can3 = pinkYellow;
      let can2 = pinkPink;
      let cape= redBlue;
      let fairyOrb = purplePurple;
      let foodBag = whiteBlue;
      let foodBurger = pinkCyan;
      let foodMuffin = pinkPurple;
      let fireOrb = yellowYellow;
      let gemBag = greenRed;
      let glove = whiteRed;
      let heart = redRed;
      let iceOrb = cyanCyan;
      let inventory = blueBlue;
      let lamp = yellowBlue;
      let magic = yellowCyan;
      let pendantBag = greenBlue;
      let pendantOfCures = blackYellow;
      let pendantOfDirection = blackPurple;
      let pendantOfHealth = blackRed;
      let pendantOfMagic = blackPink;
      let pendantOfProtection = blackCyan;
      let pendantOfRevival = blackWhite;
      let pendantOfSecrets = blackBlue;
      let pendantOfWealth = blackGreen;
      let potionBlue = pinkBlue;
      let potionGreen = pinkGreen;
      let potionPink = purpleGreen;
      let potionRed = pinkRed;
      let potionWhite = pinkWhite;
      let quiver = cyanRed;
      let ringOfArrows = yellowWhite;
      let ringOfBombs = cyanWhite;
      let ringOfHearts = purpleWhite;
      let ringOfRupees = greenWhite;
      let rodOfBombs = cyanGreen;
      let rodOfFire = yellowRed;
      let rodOfHearts = purpleRed;
      let rodOfIce = purpleBlue;
      let rodOfRupees = greenGreen;
      let rodOfStone = yellowGreen;
      let shield = whiteBlue;
      let sword = blackBlack;
      let tunic = greenBlue;


      if (this.version === '1.2.0') {
        whiteBlue.prize = 'food-bag';
        yellowBlue.prize = this.inventoryPrize;
        greenBlue.prize = 'pendant-bag';
        blueBlue.prize = this.shieldPrize
        redBlue.prize = this.tunicPrize;

        inventory = yellowBlue;
        shield = blueBlue;
        tunic = redBlue;
      }

      const sorted_1_1_6 = [
        heart,
        sword,
        inventory,
        pendantOfCures,
        pendantOfRevival,
        pendantOfDirection,
        pendantOfProtection,
        cape,
        pendantOfWealth,
        shield,
        glove,
        tunic,
        potionPink,
        bombBag,
        gemBag,
        rodOfHearts,
        rodOfRupees,
        ringOfRupees,
        lamp,
        potionBlue,
        bow,
        quiver,
        ringOfHearts,
        ringOfArrows,
        ringOfBombs,
        rodOfBombs,
        potionRed,
        fairyOrb,
        potionWhite,
        iceOrb,
        fireOrb,
        pendantOfHealth,
        pendantOfSecrets,
        pendantOfMagic,
        rodOfIce,
        rodOfStone,
        rodOfFire,
        bomb,
        potionGreen,
        magic,
        foodBurger,
        can3,
        foodMuffin,
        can2,
        arrows
      ];
      const sorted_1_2_0 = [
        heart,
        sword,
        inventory,
        pendantOfCures,
        pendantOfRevival,
        pendantOfDirection,
        pendantOfProtection,
        pendantOfWealth,
        shield,
        glove,
        tunic,
        potionPink,
        bombBag,
        gemBag,
        foodBag,
        pendantBag,
        rodOfHearts,
        rodOfRupees,
        ringOfRupees,
        potionBlue,
        bow,
        quiver,
        ringOfHearts,
        ringOfArrows,
        ringOfBombs,
        rodOfBombs,
        potionRed,
        fairyOrb,
        potionWhite,
        iceOrb,
        fireOrb,
        pendantOfHealth,
        pendantOfSecrets,
        pendantOfMagic,
        rodOfIce,
        rodOfStone,
        rodOfFire,
        bomb,
        potionGreen,
        magic,
        foodBurger,
        can3,
        foodMuffin,
        can2,
        arrows
      ];

      if (this.version === '1.2.0') {
        return sorted_1_2_0;
      }
      return sorted_1_1_6;
    },
    bowPrize: function () {
      const bowLevel = this.inventory.bow;
      if (this.version === '1.1.6') {
        if (bowLevel === 0) {
          return 'bow1';
        } else {
          return 'rupee';
        }
      }
      if (bowLevel === 2) {
        return 'rupee';
      }
      return 'bow' + (bowLevel + 1);
    },
    glovePrize: function () {
      const glovesLevel = this.inventory.gloves;
      if (glovesLevel === 3) {
        return 'rupee'
      }
      return 'gloves' + (glovesLevel + 1);
    },
    inventoryPrize: function () {
      const inventoryLevel = this.inventory.bag;
      if (inventoryLevel === 3) {
        return 'rupee';
      }
      return 'bag' + (inventoryLevel + 1);
    },
    shieldPrize: function () {
      const shieldLevel = this.inventory.shield;
      if (shieldLevel === 4) {
        return 'rupee';
      }
      return 'shield' + (shieldLevel + 1);
    },
    swordPrize: function () {
      const swordLevel = this.inventory.sword;
      if (swordLevel === 6) {
        return 'rupee';
      }
      return 'sword' + (swordLevel + 1)
    },
    tunicPrize: function () {
      const tunicLevel = this.inventory.tunic;
      if (tunicLevel === 4) {
        return 'rupee';
      }
      return 'tunic' + (tunicLevel + 1);
    }
  }
};
</script>
