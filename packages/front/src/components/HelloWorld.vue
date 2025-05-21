<template>
  <v-container class="fill-height" max-width="900">
    <div>
      <v-card>
        <v-card-title>Server status</v-card-title>
        <v-card-subtitle>
          <v-table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Is Fetching</td>
                <td>{{ listReturn.isFetching }}</td>
              </tr>
              <tr>
                <td>Error</td>
                <td>{{ listReturn.error }}</td>
              </tr>
              <tr>
                <td>Response</td>
                <td>{{ listReturn.data }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-subtitle>
      </v-card>

      <v-card>
        <v-card-title>WebSocket status</v-card-title>
        <v-card-subtitle>
          <v-table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Status</td>
                <td>{{ wsReturn.status }}</td>
              </tr>
              <tr>
                <td>Data</td>
                <td>{{ wsReturn.data }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-subtitle>
      </v-card>

      <v-img
        class="mb-4"
        height="150"
        src="@/assets/logo.png"
      />

      <div class="mb-8 text-center">
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
        <h1 class="text-h2 font-weight-bold">Vuetify</h1>
      </div>


      <v-row>
        <v-col cols="12">
          <v-card
            class="py-4"
            color="surface-variant"
            image="https://cdn.vuetifyjs.com/docs/images/one/create/feature.png"
            prepend-icon="mdi-rocket-launch-outline"
            rounded="lg"
            variant="tonal"
          >
            <template #image>
              <v-img position="top right" />
            </template>

            <template #title>
              <h2 class="text-h5 font-weight-bold">
                Get started
              </h2>
            </template>

            <template #subtitle>
              <div class="text-subtitle-1">
                Change this page by updating <v-kbd>{{ `<HelloWorld />` }}</v-kbd> in <v-kbd>components/HelloWorld.vue</v-kbd>.
              </div>
            </template>
          </v-card>
        </v-col>

        <v-col v-for="link in links" :key="link.href" cols="6">
          <v-card
            append-icon="mdi-open-in-new"
            class="py-4"
            color="surface-variant"
            :href="link.href"
            :prepend-icon="link.icon"
            rel="noopener noreferrer"
            rounded="lg"
            :subtitle="link.subtitle"
            target="_blank"
            :title="link.title"
            variant="tonal"
          />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { useWebSocket } from '@vueuse/core';
  import { useQuery } from '@tanstack/vue-query'
  import { orpcClient, orpcUtils } from '@/plugins/orpc';
  orpcUtils.planet.find.call({ id: 1 }).then(console.log)
  orpcClient.planet.find({ id: 1 }).then(console.log)
  const listReturn = useQuery(orpcUtils.planet.find.queryOptions({ input: { id: 123 } }))

  const wsReturn = useWebSocket('ws://localhost:3399/ws', {
    heartbeat: {
      message: 'ping',
      interval: 1000,
      pongTimeout: 1000,
    },
  })

  const links = [
    {
      href: 'https://vuetifyjs.com/',
      icon: 'mdi-text-box-outline',
      subtitle: 'Learn about all things Vuetify in our documentation.',
      title: 'Documentation',
    },
    {
      href: 'https://vuetifyjs.com/introduction/why-vuetify/#feature-guides',
      icon: 'mdi-star-circle-outline',
      subtitle: 'Explore available framework Features.',
      title: 'Features',
    },
    {
      href: 'https://vuetifyjs.com/components/all',
      icon: 'mdi-widgets-outline',
      subtitle: 'Discover components in the API Explorer.',
      title: 'Components',
    },
    {
      href: 'https://discord.vuetifyjs.com',
      icon: 'mdi-account-group-outline',
      subtitle: 'Connect with Vuetify developers.',
      title: 'Community',
    },
  ]
</script>
