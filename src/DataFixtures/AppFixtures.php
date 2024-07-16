<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Category;
use App\Entity\Product;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);

        $product = new Product();
        $product->setName("black Cyber trousers");
        $product->setSlug("black-cyber-trousers");
        $product->setDescription("Urban wargear sculpted for the undercity grind—heavy-duty black tactical pants laced with modular strap systems and quick-release buckles. GRAIL-branded harness webbing snakes across the thighs, locking down gear with militant precision. Layered pockets, reinforced knees, and compression-fit panels built to flex and strike. These aren’t just pants—they’re armor you wear like defiance, stitched in code and stitched for chaos. Ready for breach, blackout, or breakneck sprint through sector lockdowns.");
        $product->setDescriptionShort("Short summary of Black Cyber Urban Trousers.");
        $product->setPrice("350");
        $product->setStock(22);
        $product->setPicture("black-cyber-trousers.jpg");
        $product->setDateAdd(new \DateTimeImmutable());

        // Optionally assign an existing category, e.g. the first one found
        $category = $manager->getRepository(Category::class)->findOneBy([]);
        if ($category) {
            $product->addCategory($category);
        }

        $manager->persist($product);
        $manager->flush();

    }
}
