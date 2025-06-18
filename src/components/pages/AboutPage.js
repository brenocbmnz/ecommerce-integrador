import React from 'react';

const AboutPage = () => {
    console.log('Rendering AboutPage component');
    return (
        <div className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sobre a ShopSphere</h2>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <p className="text-gray-600 leading-relaxed">
                    Bem-vindo à IntegraStore, sua fonte número um para todas as coisas legais e inovadoras. Somos dedicados a fornecer a você o melhor dos produtos, com foco em qualidade, atendimento ao cliente e exclusividade.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                    Este projeto é uma demonstração de um aplicativo de e-commerce construído com React, Node.js e MongoDB. Ele foi projetado para ser uma plataforma simples e intuitiva, onde você pode explorar uma variedade de produtos, adicionar itens ao carrinho e realizar pedidos de forma segura.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                    Lembrando que este projeto é apenas para fins educacionais e não está vinculado a uma loja real. Todos os produtos e informações são fictícios.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;