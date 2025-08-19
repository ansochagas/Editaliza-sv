/**
 * INTERCEPTADOR DE BOTÕES - FORÇA CORES INLINE
 * Este script intercepta a criação de botões e força cores inline
 */

(function() {
    'use strict';
    
    console.log('🎯 INTERCEPTADOR DE BOTÕES - Ativo');
    
    // Interceptar innerHTML e modificar botões
    const originalSetInnerHTML = Element.prototype.set;
    
    // Override createElement para buttons
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        const element = originalCreateElement.call(this, tagName);
        
        if (tagName.toLowerCase() === 'button') {
            // Interceptar quando o botão receber conteúdo
            const originalSetTextContent = Object.getOwnPropertyDescriptor(Element.prototype, 'textContent').set;
            Object.defineProperty(element, 'textContent', {
                set: function(value) {
                    originalSetTextContent.call(this, value);
                    if (value && (value.includes('Iniciar') || value.includes('Reforçar') || value.includes('Adiar'))) {
                        this.style.color = '#FFFFFF !important';
                    }
                },
                get: function() {
                    return originalSetTextContent ? this.textContent : '';
                }
            });
        }
        
        return element;
    };
    
    // Observer para elementos que são adicionados dinamicamente
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    // Verificar se é um botão problemático
                    if (node.tagName === 'BUTTON') {
                        fixButton(node);
                    }
                    
                    // Verificar botões filhos
                    const buttons = node.querySelectorAll ? node.querySelectorAll('button') : [];
                    buttons.forEach(fixButton);
                    
                    // Verificar títulos do rodapé
                    if (node.matches && (node.matches('.footer-nav-title, footer h4, footer h3') || 
                        node.querySelector('.footer-nav-title, footer h4, footer h3'))) {
                        fixFooterTitles(node);
                    }
                }
            });
        });
    });
    
    function fixButton(button) {
        const text = button.textContent || '';
        if (text.includes('Iniciar') || text.includes('Reforçar') || text.includes('Adiar') || text.includes('Continuar')) {
            button.style.setProperty('color', '#FFFFFF', 'important');
            
            // Forçar todos os filhos
            const children = button.querySelectorAll('*');
            children.forEach(child => {
                child.style.setProperty('color', '#FFFFFF', 'important');
            });
            
            // Adicionar observador para mudanças no botão
            const buttonObserver = new MutationObserver(() => {
                button.style.setProperty('color', '#FFFFFF', 'important');
                const newChildren = button.querySelectorAll('*');
                newChildren.forEach(child => {
                    child.style.setProperty('color', '#FFFFFF', 'important');
                });
            });
            
            buttonObserver.observe(button, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'style']
            });
        }
    }
    
    function fixFooterTitles(element) {
        const titles = element.matches('.footer-nav-title, footer h4, footer h3') ? 
                     [element] : 
                     element.querySelectorAll('.footer-nav-title, footer h4, footer h3');
        
        titles.forEach(title => {
            const text = title.textContent || '';
            if (text.includes('Plataforma') || text.includes('Recursos') || text.includes('Suporte')) {
                title.style.setProperty('color', '#FFFFFF', 'important');
                title.style.setProperty('font-weight', '600', 'important');
                title.style.setProperty('text-transform', 'uppercase', 'important');
            }
        });
    }
    
    // Iniciar observação
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
    });
    
    // Aplicar correções aos elementos existentes
    document.addEventListener('DOMContentLoaded', () => {
        const existingButtons = document.querySelectorAll('button');
        existingButtons.forEach(fixButton);
        
        const existingTitles = document.querySelectorAll('.footer-nav-title, footer h4, footer h3');
        existingTitles.forEach(title => fixFooterTitles(title));
    });
    
    console.log('🎯 INTERCEPTADOR DE BOTÕES - Configurado');
    
})();