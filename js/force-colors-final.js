/**
 * CORREÇÃO FORÇA BRUTA FINAL - CORES QUE NÃO FUNCIONAM
 * Este arquivo deve ser carregado DEPOIS de todos os outros CSS e JS
 */

(function() {
    'use strict';
    
    console.log('🔥 FORÇA BRUTA FINAL - INICIANDO CORREÇÃO DE CORES');
    
    // Função para aplicar estilos com força máxima
    function forceStyles() {
        // 1. BOTÕES DE SESSÃO - FORÇA MÁXIMA
        const buttons = document.querySelectorAll(`
            button[class*="bg-green"],
            button[class*="bg-yellow"],
            button[class*="bg-gray"],
            button[class*="bg-orange"],
            button[class*="bg-blue"],
            button[class*="bg-red"],
            .bg-green-500,
            .bg-green-600,
            .bg-yellow-500,
            .bg-yellow-600,
            .bg-gray-500,
            .bg-gray-600,
            .bg-orange-500,
            .bg-orange-600,
            .bg-blue-500,
            .bg-blue-600,
            .bg-red-500,
            .bg-red-600
        `);
        
        buttons.forEach(button => {
            if (button.textContent.includes('Iniciar') || 
                button.textContent.includes('Reforçar') || 
                button.textContent.includes('Adiar') ||
                button.textContent.includes('Continuar')) {
                button.style.setProperty('color', '#FFFFFF', 'important');
                // Forçar spans e elementos filhos
                const spans = button.querySelectorAll('*');
                spans.forEach(span => {
                    span.style.setProperty('color', '#FFFFFF', 'important');
                });
            }
        });
        
        // FORÇA ADICIONAL - BUSCAR POR TEXTO ESPECÍFICO
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(button => {
            const text = button.textContent.trim();
            if (text.includes('Iniciar Estudo') || 
                text.includes('Reforçar') || 
                text.includes('Adiar') ||
                text.includes('Continuar') ||
                text.includes('Iniciar')) {
                button.style.setProperty('color', '#FFFFFF', 'important');
                const children = button.querySelectorAll('*');
                children.forEach(child => {
                    child.style.setProperty('color', '#FFFFFF', 'important');
                });
            }
        });
        
        // 2. TÍTULOS DO RODAPÉ - FORÇA MÁXIMA
        const footerTitles = document.querySelectorAll(`
            .footer-nav-title,
            h3.footer-nav-title,
            .footer-nav h4,
            .footer-main-grid h4,
            .editaliza-footer-refatorado h4,
            footer h4,
            footer h3,
            footer h5
        `);
        
        footerTitles.forEach(title => {
            if (title.textContent.includes('Plataforma') || 
                title.textContent.includes('Recursos') || 
                title.textContent.includes('Suporte')) {
                title.style.setProperty('color', '#FFFFFF', 'important');
                title.style.setProperty('font-weight', '600', 'important');
                title.style.setProperty('text-transform', 'uppercase', 'important');
            }
        });
        
        // FORÇA ADICIONAL - BUSCAR POR TEXTO NO RODAPÉ
        const allFooterElements = document.querySelectorAll('footer *, .editaliza-footer-refatorado *');
        allFooterElements.forEach(element => {
            const text = element.textContent.trim();
            if (text === 'Plataforma' || text === 'Recursos' || text === 'Suporte') {
                element.style.setProperty('color', '#FFFFFF', 'important');
                element.style.setProperty('font-weight', '600', 'important');
                element.style.setProperty('text-transform', 'uppercase', 'important');
            }
        });
        
        // 3. LOGO DO RODAPÉ - GARANTIR FUNDO BRANCO
        const logos = document.querySelectorAll(`
            .footer-logo,
            .editaliza-footer-refatorado .footer-logo
        `);
        
        logos.forEach(logo => {
            logo.style.setProperty('background', '#FFFFFF', 'important');
            logo.style.setProperty('background-color', '#FFFFFF', 'important');
            logo.style.setProperty('border', '2px solid rgba(255, 255, 255, 0.3)', 'important');
            logo.style.setProperty('border-radius', '12px', 'important');
            logo.style.setProperty('padding', '12px 16px', 'important');
            logo.style.setProperty('box-shadow', '0 4px 12px rgba(0,0,0,0.15)', 'important');
        });
        
        // 4. OVERRIDE INLINE STYLES
        const elementsWithInlineColors = document.querySelectorAll('[style*="color:"], [style*="color :"]');
        elementsWithInlineColors.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const parent = element.closest('button, .footer-nav-title, footer');
            
            if (parent) {
                if (parent.matches('button') && 
                    (parent.textContent.includes('Iniciar') || 
                     parent.textContent.includes('Reforçar') || 
                     parent.textContent.includes('Adiar'))) {
                    element.style.setProperty('color', '#FFFFFF', 'important');
                }
                
                if (parent.matches('.footer-nav-title, footer h4, footer h3') &&
                    (element.textContent.includes('Plataforma') || 
                     element.textContent.includes('Recursos') || 
                     element.textContent.includes('Suporte'))) {
                    element.style.setProperty('color', '#FFFFFF', 'important');
                }
            }
        });
        
        console.log('✅ FORÇA BRUTA - Estilos aplicados');
    }
    
    // Aplicar imediatamente
    forceStyles();
    
    // Re-aplicar quando DOM mudar
    const observer = new MutationObserver((mutations) => {
        let shouldReapply = false;
        
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.matches('button, .footer-nav-title, footer *') ||
                            node.querySelector('button, .footer-nav-title, footer *')) {
                            shouldReapply = true;
                        }
                    }
                });
            }
        });
        
        if (shouldReapply) {
            setTimeout(forceStyles, 100);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Re-aplicar periodicamente como fallback
    setInterval(forceStyles, 2000);
    
    // Aplicar em cada mudança de página
    window.addEventListener('popstate', forceStyles);
    window.addEventListener('hashchange', forceStyles);
    
    // Observer mais agressivo
    const config = { 
        childList: true, 
        subtree: true, 
        attributes: true, 
        attributeFilter: ['class', 'style']
    };
    
    observer.observe(document.body, config);
    
    // Re-aplicar em eventos
    document.addEventListener('DOMContentLoaded', forceStyles);
    window.addEventListener('load', forceStyles);
    
    console.log('🔥 FORÇA BRUTA FINAL - Sistema ativo');
    
})();