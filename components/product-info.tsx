'use client';

import { Button } from '@/components/ui/button';
import { toast, useToast } from '@/components/ui/use-toast';
import { SanityProduct } from '@/config/inventory';
import { getSizeName } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';

interface Props {
  data: SanityProduct;
}

export function ProductInfo({ data }: Props) {
  const { addItem, cartDetails, incrementItem } = useShoppingCart();
  const [selectSize, setSelectSize] = useState(data.sizes[0]);
  const isInCart = !!cartDetails?.[data._id];
  const isInCartWhithSameSize = ``;

  function addToCart() {
    const item = {
      ...data,
      product_data: {
        size: selectSize,
      },
    };
    // if item already in cart
    isInCart ? incrementItem(data._id) : addItem(item);

    toast({
      title: `${data.name} (${selectSize})`,
      description: 'Product added to cart',
      action: (
        <Link href={'/cart'}>
          <Button variant="link" className="gap-x-2 whitespace-nowrap">
            <span>Go to cart</span>
            <ArrowRight size={16} />
          </Button>
        </Link>
      ),
      duration: 3500,
    });
  }

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">{data.name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">
          {formatCurrencyString({ value: data.price, currency: data.currency })}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base">{data.description}</div>
      </div>

      <div className="mt-4">
        <p>
          Size: <strong>{getSizeName(selectSize)}</strong>
        </p>
        {data.sizes.map((size, idx) => (
          <Button
            key={size}
            onClick={() => setSelectSize(data.sizes[idx])}
            variant={selectSize === data.sizes[idx] ? 'default' : 'outline'}
            className="mr-2 mt-4"
          >
            {size}
          </Button>
        ))}
      </div>

      <form className="mt-6">
        <div className="mt-4 flex">
          <Button
            onClick={addToCart}
            type="button"
            className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Add to cart
          </Button>
        </div>
      </form>
    </div>
  );
}
