<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-newspaper-variant-outline</v-icon>
            Health News & Updates
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="8">
                <v-text-field v-model="searchQuery" label="Search articles" prepend-inner-icon="mdi-magnify" clearable
                  hide-details></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-select v-model="selectedCategory" :items="categories" label="Filter by category"
                  prepend-inner-icon="mdi-filter-variant" clearable hide-details></v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Featured Article -->
    <v-row v-if="filteredNews.length > 0">
      <v-col cols="12">
        <v-card class="mb-4 hover-lift">
          <v-row>
            <v-col cols="12" md="6">
              <v-img :src="filteredNews[0].image" height="300" cover></v-img>
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-column">
              <v-card-title class="text-h4">{{ filteredNews[0].title }}</v-card-title>
              <v-chip size="small" color="primary" class="ma-4 mt-0 align-self-start">{{ filteredNews[0].category
                }}</v-chip>
              <v-card-text>
                <div class="mb-2 text-subtitle-1">{{ formatDate(filteredNews[0].date) }} • {{ filteredNews[0].author }}
                </div>
                <p class="text-body-1">{{ filteredNews[0].summary }}</p>
              </v-card-text>
              <v-card-actions class="mt-auto">
                <v-btn color="primary" @click="selectedArticle = filteredNews[0]">
                  Read More
                </v-btn>
                <v-btn variant="text" prepend-icon="mdi-share-variant">
                  Share
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- News List -->
    <v-row v-if="filteredNews.length > 1">
      <v-col cols="12">
        <h2 class="text-h5 mb-4">Latest Articles</h2>
      </v-col>
      <v-col v-for="article in filteredNews.slice(1)" :key="article.id" cols="12" sm="6" md="4">
        <v-card height="100%" class="hover-lift">
          <v-img :src="article.image" height="200" cover></v-img>
          <v-card-title>{{ article.title }}</v-card-title>
          <v-chip size="small" color="primary" class="ma-4 mt-0">{{ article.category }}</v-chip>
          <v-card-text>
            <div class="mb-2 text-caption">{{ formatDate(article.date) }} • {{ article.author }}</div>
            <p class="text-body-2 text-truncate-3-lines">{{ article.summary }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" variant="text" @click="selectedArticle = article">
              Read More
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-bookmark-outline" variant="text"></v-btn>
            <v-btn icon="mdi-share-variant" variant="text"></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="filteredNews.length === 0">
      <v-col cols="12" class="text-center py-12">
        <v-icon size="64" color="grey">mdi-alert-circle-outline</v-icon>
        <h3 class="text-h5 mt-4">No articles found</h3>
        <p class="text-body-1 mt-2">Try adjusting your search criteria</p>
        <v-btn color="primary" variant="outlined" class="mt-4" @click="searchQuery = ''; selectedCategory = ''">
          Clear Filters
        </v-btn>
      </v-col>
    </v-row>

    <!-- Newsletter Subscription -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card color="primary" class="text-center pa-6">
          <h2 class="text-h5 text-white mb-4">Stay Updated on Vaccine News</h2>
          <p class="text-white mb-6">Subscribe to our weekly newsletter for the latest updates on vaccines, health
            policies, and medical research.</p>
          <v-row>
            <v-col cols="12" sm="8" md="6" class="mx-auto">
              <v-text-field label="Your Email Address" variant="outlined" bg-color="white" density="comfortable"
                hide-details class="mb-4"></v-text-field>
              <v-btn color="secondary" variant="elevated" size="large" block>
                Subscribe Now
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Article Dialog -->
    <v-dialog v-model="selectedArticle" max-width="800">
      <v-card v-if="selectedArticle">
        <v-img :src="selectedArticle.image" height="300" cover></v-img>
        <v-card-title class="text-h4 pt-4">{{ selectedArticle.title }}</v-card-title>
        <v-chip size="small" color="primary" class="ma-4 mt-0">{{ selectedArticle.category }}</v-chip>
        <v-card-text>
          <div class="d-flex align-center mb-4">
            <v-avatar color="primary" size="36" class="me-2">
              <v-icon color="white">mdi-account</v-icon>
            </v-avatar>
            <div>
              <div class="font-weight-medium">{{ selectedArticle.author }}</div>
              <div class="text-caption">{{ formatDate(selectedArticle.date) }}</div>
            </div>
          </div>

          <p class="text-body-1 mb-4">{{ selectedArticle.summary }}</p>

          <!-- Placeholder for full article content -->
          <p class="text-body-1 mb-3">
            Recent advancements in vaccination technology have shown promising results in clinical trials.
            The new approach offers potential benefits for both patients and healthcare providers.
          </p>
          <p class="text-body-1 mb-3">
            "This represents a significant step forward in our ongoing efforts to improve public health through
            vaccination," said Dr. Elizabeth Chen, lead researcher on the project.
          </p>
          <p class="text-body-1 mb-3">
            The World Health Organization has emphasized the importance of continued investment in vaccine
            research and development, particularly as new infectious diseases emerge and existing ones evolve.
          </p>
          <p class="text-body-1">
            Public health officials recommend staying up-to-date with all recommended vaccinations as the
            most effective way to protect individual and community health.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" prepend-icon="mdi-share-variant" variant="text">
            Share
          </v-btn>
          <v-btn color="primary" prepend-icon="mdi-bookmark-outline" variant="text">
            Save
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="selectedArticle = null">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.text-truncate-3-lines {
  display: -webkit-box;

  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<script setup>
import { ref, computed } from 'vue'
import { format } from 'date-fns' // Ensure you have date-fns installed

// Sample news data
const newsArticles = ref([
  {
    id: 1,
    title: 'New RSV Vaccine Shows Promise for Older Adults',
    summary: 'A recently developed vaccine for respiratory syncytial virus (RSV) has shown significant efficacy in preventing severe disease in adults over 60, according to a new study published in the New England Journal of Medicine.',
    date: new Date(2025, 6, 28),
    author: 'Dr. Emma Johnson',
    category: 'Research',
    image: 'https://images.pexels.com/photos/5863365/pexels-photo-5863365.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750'
  },
  {
    id: 2,
    title: 'Global Vaccination Campaign Reaches Milestone',
    summary: 'The World Health Organization announced today that its global vaccination initiative has reached 80% coverage for essential childhood vaccines in developing countries, a significant improvement from 60% just five years ago.',
    date: new Date(2025, 6, 25),
    author: 'Michael Rivera',
    category: 'Global Health',
    image: 'https://images.pexels.com/photos/3952240/pexels-photo-3952240.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750'
  },
  {
    id: 3,
    title: 'New Technology Makes Vaccine Distribution More Efficient',
    summary: 'A startup has developed a blockchain-based system to track vaccine distribution, ensuring proper temperature control and reducing waste by up to 30% in early trials.',
    date: new Date(2025, 6, 20),
    author: 'Sarah Chen',
    category: 'Technology',
    image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750'
  },
  {
    id: 4,
    title: 'Annual Flu Vaccine Updated for Coming Season',
    summary: 'The CDC has announced updates to this year\'s influenza vaccine, which will protect against four strains of the virus expected to circulate during the upcoming flu season.',
    date: new Date(2025, 6, 15),
    author: 'Dr. Robert Kim',
    category: 'Public Health',
    image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750'
  },
  {
    id: 5,
    title: 'Vaccine Hesitancy Decreasing Among Young Adults',
    summary: 'A new survey indicates that vaccine hesitancy has decreased by 15% among 18-29 year olds in the past year, attributed to targeted education campaigns and peer advocacy programs.',
    date: new Date(2025, 6, 10),
    author: 'Jessica Martinez',
    category: 'Social Trends',
    image: 'https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750'
  }
])

// Filter state
const searchQuery = ref('')
const selectedCategory = ref('')
const categories = ['Research', 'Global Health', 'Technology', 'Public Health', 'Social Trends']

// Filtered news
const filteredNews = computed(() => {
  let filtered = [...newsArticles.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(article => article.category === selectedCategory.value)
  }

  return filtered.sort((a, b) => b.date.getTime() - a.date.getTime())
})

// Format date
const formatDate = (date) => {
  return format(date, 'MMMM d, yyyy')
}

// Expanded article
const selectedArticle = ref(null)
</script>