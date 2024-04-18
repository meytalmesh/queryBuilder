<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">New Data Policy</div>
      </q-card-section>
      <q-separator />

      <q-card-actions vertical>
        <q-card flat :class="'bg-grey-2'">
          <q-card-section>
            <div class="text-subtitle2">Condition</div>
          </q-card-section>

          <div class="query-builder form-inline" style="padding: 0 50px">
            <div>
              <query-group :depth="1" />
            </div>
          </div>
          <q-btn
            @click="executeSelectQuery(groups)"
            label="Execute SELECT Query"
          />
          <!-- Display query results -->
          <div v-if="queryResults">
            <h2>Query Results</h2>
            <ul>
              <!-- <li v-for="(result, index) in queryResults.results" :key="index">{{ result.name }}</li> -->
            </ul>
          </div>
        </q-card>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QueryGroup from '../components/QueryGroup.vue';
import axios from 'axios'; // Import Axios

export default defineComponent({
  name: 'IndexPage',
  components: {
    QueryGroup,
  },
  data() {
    return {
      queryResults: null, // To store query results
      rules: [] as Array<object | object[]>, // Specify the type as an array that can contain objects or arrays of objects
      currentComponent: 'QueryGroupBuilder', // Initialize with the QueryGroupBuilder component
      groups: [],
      // query: {
      //   logicalOperator: 'AND',
      //   children: []
      // },
    };
  },

  computed: {
    mergedRules() {
      let array = [1];
      return array;
    },
  },

  methods: {
    cancelRule() {
      // Implement logic to cancel the creation of the rule or group at the specified index
      this.rules.splice(0, 1);
    },

    addRule() {
      // Add a new rule to the top-level rules array
      this.rules.push({});
    },
    addGroup() {
      // Add a new group to the top-level rules array
      this.rules.push([]);
    },

    async executeSelectQuery(groupData: Array<object | object[]>) {
      try {
        // Get the selected field, operator, and search value
        const query = groupData;
        //const groups = groupData;
        // Make a GET request to the backend API
        const response = await axios.get('/api/select', {
          params: {
            query,
          },
        });

        // Set query results in the component's data
        this.queryResults = response.data;

        // Handle the results as needed
      } catch (error) {
        console.error(error);
        // Handle errors
      }
    },
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 90%
</style>
