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
        v-for="(gemAmount, gemColor) in inventoryGems"
        v-model="inventory.gems[gemColor]"
        :alt="gemColor + ' colored gem'"
        :src="'/zora-pond-tracker/sprites/' + version + '/gem-' + gemColor + '.png'"
        :version="version"
        :key="gemColor"
      />
      <InventoryItem
        v-model="inventory.bag"
        alt="Bag"
        :min="version === '1.2.0' ? 0 : 1"
        :max="version === '1.2.0' ? 5 : 3"
        :version="version"
      />
      <InventoryItem   v-model="inventory.tunic"  alt="Tunic"  :min="1" :max="4" :version="version" />
      <InventoryItem   v-model="inventory.sword"  alt="Sword"           :max="6" :version="version" />
      <InventoryItem   v-model="inventory.shield" alt="Shield"          :max="4" :version="version" />
      <InventoryItem   v-model="inventory.gloves" alt="Gloves"          :max="3" :version="version" />
      <InventoryItem   v-model="inventory.bow"    alt="Bow"             :max="2" :version="version" />
      <template v-if="version === '1.2.0'">
        <InventoryItem v-model="inventory.lamp"   alt="Lamp"            :max="2" :version="version" />
      </template>

      <div>
        <span
          v-for="(bool, item) in inventoryBooleans"
          class="sub-item-wrapper"
          :key="'booleans-' + item"
          role="button"
          tabindex="0"
          @click="inventory.booleans[item] = !inventory.booleans[item]"
          @keydown.prevent.space="inventory.booleans[item] = !inventory.booleans[item]"
          @keyup.prevent.enter="inventory.booleans[item] = !inventory.booleans[item]"
        >
          <img
            :alt="titleCase(item)"
            class="sub-item pixel-corners pointer"
            :data-selected="bool"
            :src="'/zora-pond-tracker/sprites/' + version + '/' + item + '.png'"
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
          v-for="(bool, item) in filterGems"
          class="sub-item-wrapper"
          :key="'sub-item-' + item"
          role="button"
          tabindex="0"
          @click="inventory.filters.gems[item] = !inventory.filters.gems[item]"
          @keydown.prevent.space="inventory.filters.gems[item] = !inventory.filters.gems[item]"
          @keyup.prevent.enter="inventory.filters.gems[item] = !inventory.filters.gems[item]"
        >
          <img
            :alt="titleCase(item + '-gem')"
            class="sub-item small pixel-corners pointer"
            :data-selected="bool"
            :src="'/zora-pond-tracker/sprites/' + version + '/gem-' + item + '.png'"
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
      <GuideLink
        alt="Dwarven Maze Map"
        image="/zora-pond-tracker/dwarven-maze.jpg"
        title="Dwarven Maze"
      />
      <GuideLink
        alt="Kinstone reward chart"
        :image="'/zora-pond-tracker/kinstone-guide-' + version + '.png'"
        title="Kinstone Rewards"
      />
      <GuideLink
        alt="Stats chart"
        image="/zora-pond-tracker/stats-chart.png"
        link="https://docs.google.com/spreadsheets/u/0/d/12kUPtlggTfWe7jjaKoyvBQY_idnZ2PL8xKgC8gRePV4/htmlview"
        title="Enemy and Item Stats"
      />
    </section>
    <footer></footer>
  </div>
</template>

<script>
import CheckBox from '@/components/CheckBox.vue';
import GuideLink from '@/components/GuideLink.vue';
import InventoryItem from '@/components/InventoryItem.vue';
import ItemPrize from '@/components/ItemPrize.vue';
import NumberField from '@/components/NumberField.vue';

import { titleCase } from '@/helpers/index.js';
import { gemPrizes_1_1_6 } from '@/helpers/gem-prizes-1.1.6.js';
import { gemPrizes_1_2_0 } from '@/helpers/gem-prizes-1.2.0.js';

export default {
  components: {
    CheckBox,
    GuideLink,
    ItemPrize,
    InventoryItem,
    NumberField
  },
  data: function () {
    return {
      version: '1.2.0',
      inventory: {
        filters: {
          showAvailable: true,
          showUnavailable: false,
          showRupees: true,
          gems: {
            pink: true,
            orange: true,
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
        lamp: 1,
        booleans: {
          'bomb-bag': false,
          'food-bag': false,
          'gem-bag': false,
          quiver: false,
          boomerang: false,
          hookshot: false,
          cape: false,
          lamp: false,
          'pendant-bag': false,
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
          orange: 0,
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
        delete booleans.boomerang;
        delete booleans['food-bag'];
        delete booleans.hookshot;
        delete booleans['pendant-bag'];
      }
      if (this.version === '1.2.0') {
        delete booleans.lamp;
      }
      return booleans;
    },
    inventoryGems: function () {
      const gems = {
        ...this.inventory.gems
      };
      if (this.version === '1.1.6') {
        delete gems.orange;
      }
      return gems;
    },
    filterGems: function () {
      const gems = {
        ...this.inventory.filters.gems
      };
      if (this.version === '1.1.6') {
        delete gems.orange;
      }
      return gems;
    },
    prizePool: function () {
      const dynamicPrizes = {
        bowPrize: this.bowPrize,
        glovePrize: this.glovePrize,
        lampPrize: this.lampPrize,
        inventoryPrize: this.inventoryPrize,
        shieldPrize: this.shieldPrize,
        swordPrize: this.swordPrize,
        tunicPrize: this.tunicPrize
      };

      if (this.version === '1.1.6') {
        return gemPrizes_1_1_6(dynamicPrizes);
      }
      return gemPrizes_1_2_0(dynamicPrizes);
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
        return 'rupee';
      }
      return 'gloves' + (glovesLevel + 1);
    },
    lampPrize: function () {
      const lampLevel = this.inventory.lamp;
      if (lampLevel === 2) {
        return 'rupee';
      }
      return 'lamp' + (lampLevel + 1);
    },
    inventoryPrize: function () {
      const inventoryLevel = this.inventory.bag;
      let max = 3;
      if (this.version === '1.2.0') {
        max = 5;
      }
      if (inventoryLevel === max) {
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
      return 'sword' + (swordLevel + 1);
    },
    tunicPrize: function () {
      const tunicLevel = this.inventory.tunic;
      if (tunicLevel === 4) {
        return 'rupee';
      }
      return 'tunic' + (tunicLevel + 1);
    }
  },
  watch: {
    version: function (value) {
      if (value === '1.1.6') {
        if (this.inventory.bag === 0) {
          this.inventory.bag = 1;
        }
        if (this.inventory.bag > 3) {
          this.inventory.bag = 3;
        }
      }
      if (value === '1.2.0' && this.inventory.bag === 1) {
        this.inventory.bag = 0;
      }
    }
  }
};
</script>
