import { ProductFilters } from '@/components/product-filters';
import { ProductGrid } from '@/components/product-grid';
import { ProductSort } from '@/components/product-sort';
import { SanityProduct } from '@/config/inventory';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

interface Props {
  searchParams: {
    data?: string;
    price?: string;
    color?: string;
    category?: string;
    size?: string;
    search?: string;
  };
}

export default async function Page(props: Props) {
  const { data, price, color, category, size, search } = props.searchParams;

  // Search query form input header
  const searchFilter = search ? `&& name match "${search}"` : '';

  // Filter Query
  const productFilter = `_type == 'product'`;

  const colorFilter = color ? `&& "${color}" in colors` : '';
  const sizeFilter = size ? `&& "${size}" in sizes` : '';
  const categoryFilter = category ? `&& "${category}" in categories` : '';

  const filter = `*[${productFilter}${colorFilter}${sizeFilter}${categoryFilter}${searchFilter}]`;

  // Filtering by searchQuery
  const priceOrder = price ? `| order(price ${price})` : '';
  const dataOrder = data ? `| order(price ${data})` : '';
  const order = `${priceOrder}${dataOrder}`;

  const products = await client.fetch<SanityProduct[]>(groq`${filter} ${order}{
      _id,
      _createdAt,
      name,
      sku,
      images,
      currency,
      price,
      description,
      'slug': slug.current
  }`);

  //
  return (
    <div>
      <div className="px-4 pt-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-normal">
          {siteConfig.name}
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base">
          {siteConfig.description}
        </p>
      </div>
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {products.length} product{products.length > 1 ? 's' : ''}
            </h1>
            <ProductSort />
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div
              className={cn(
                'grid grid-cols-1 gap-x-8 gap-y-10',
                products.length > 0
                  ? 'lg:grid-cols-4'
                  : 'lg:grid-cols-[1fr_3fr]',
              )}
            >
              <div className="hidden lg:block">
                <ProductFilters />
              </div>
              <ProductGrid products={products} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
