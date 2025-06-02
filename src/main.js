import './style.css';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://gcqzpssokajayorbjbrb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcXpwc3Nva2FqYXlvcmJqYnJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTQyMzksImV4cCI6MjA2MzIzMDIzOX0.c2MHCFThW_HcaM2qeQVKBrFRAtlWO8_l_6NsphnhhYs');

const articleList = document.querySelector('#article-list');
const form = document.querySelector('#article-form');

async function fetchArticles(sort = 'created_at.desc') {
  const [field, direction] = sort.split('.');
  const { data: article } = await supabase
    .from('article')
    .select('*')
    .order(field, { ascending: direction === 'asc' });

  articleList.innerHTML = article.map(article => `
    <div class="border p-4 rounded shadow">
      <h2 class="text-xl font-bold">${article.title}</h2>
      <h3 class="italic text-gray-600">${article.subtitle}</h3>
      <p class="text-sm text-gray-500">Autor: ${article.author}</p>
      <p class="text-sm text-gray-500">Data: ${article.created_at}</p>
      <p>${article.content}</p>
    </div>
  `).join('');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const newArticle = Object.fromEntries(formData.entries());
  await supabase.from('article').insert([newArticle]);
  form.reset();
  fetchArticles();
});


fetchArticles();