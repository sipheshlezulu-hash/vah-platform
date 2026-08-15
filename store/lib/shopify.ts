const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const shopifyConfigured = Boolean(domain && token);

export async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}) {
  if (!domain || !token) throw new Error('Shopify Storefront API is not configured.');
  const response = await fetch(`https://${domain}/api/2026-07/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });
  if (!response.ok) throw new Error(`Shopify request failed: ${response.status}`);
  const json = await response.json();
  if (json.errors) throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '));
  return json.data as T;
}

export const PRODUCTS_QUERY = `#graphql
query Products($first: Int!) {
  products(first: $first) {
    nodes {
      id title handle description
      featuredImage { url altText width height }
      priceRange { minVariantPrice { amount currencyCode } }
      variants(first: 10) { nodes { id title availableForSale price { amount currencyCode } } }
    }
  }
}`;
