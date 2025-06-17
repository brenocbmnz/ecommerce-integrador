import React from 'react';

const AboutPage = () => {
    console.log('Rendering AboutPage component');
    return (
        <div className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">About ShopSphere</h2>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <p className="text-gray-600 leading-relaxed">
                    Welcome to ShopSphere, your number one source for all things cool and innovative. We're dedicated to giving you the very best of products, with a focus on quality, customer service, and uniqueness.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                    Founded in 2025, ShopSphere has come a long way from its beginnings. When we first started out, our passion for providing the best equipment for our fellow tech enthusiasts drove us to do intense research, and gave us the impetus to turn hard work and inspiration into to a booming online store. We now serve customers all over the world, and are thrilled to be a part of the quirky, eco-friendly, fair trade wing of the e-commerce industry.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                    We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;