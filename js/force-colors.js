/**
 * Force Colors - Garantir cores corretas em elementos específicos
 */

(function() {
    'use strict';
    
    function forceColors() {
        // 1. BOTÕES DE SESSÃO - Forçar texto branco
        const sessionButtons = document.querySelectorAll(`
            .bg-green-500, .bg-green-600,
            .bg-yellow-500, .bg-yellow-600,
            .bg-gray-500, .bg-gray-600,
            button[class*="bg-green"],
            button[class*="bg-yellow"],
            button[class*="bg-gray"],
            .flex.gap-2 button,
            .study-card button,
            .session-card button
        `);
        
        sessionButtons.forEach(button => {
            button.style.color = '#FFFFFF';
            button.style.setProperty('color', '#FFFFFF', 'important');
            
            // Forçar em todos os elementos filhos
            const children = button.querySelectorAll('*');
            children.forEach(child => {
                child.style.color = '#FFFFFF';
                child.style.setProperty('color', '#FFFFFF', 'important');
            });
        });
        
        // 2. RODAPÉ - Títulos Plataforma, Recursos, Suporte
        const footerTitles = document.querySelectorAll(`
            .footer-nav-title,
            footer h4, footer h5, footer h3,
            .editaliza-footer-refatorado h4,
            .editaliza-footer-refatorado .footer-nav-title
        `);
        
        footerTitles.forEach(title => {
            title.style.color = '#FFFFFF';
            title.style.setProperty('color', '#FFFFFF', 'important');
            title.style.fontWeight = '700';
            title.style.textTransform = 'uppercase';
        });
        
        // 3. LOGO DO RODAPÉ - Forçar texto branco
        const logoTextPaths = document.querySelectorAll(`
            .footer-logo svg .cls-2,
            .editaliza-footer-refatorado .footer-logo svg .cls-2,
            footer svg .cls-2,
            .footer-logo-icon .cls-2
        `);
        
        logoTextPaths.forEach(path => {
            path.style.fill = '#FFFFFF';
            path.style.setProperty('fill', '#FFFFFF', 'important');
            path.setAttribute('fill', '#FFFFFF');
        });
        
        // 4. Forçar em elementos com texto específico
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(button => {
            const text = button.textContent.trim().toLowerCase();
            if (text.includes('iniciar') || text.includes('reforçar') || text.includes('adiar')) {
                button.style.color = '#FFFFFF';
                button.style.setProperty('color', '#FFFFFF', 'important');
            }
        });
        
        // 5. Procurar por títulos específicos no rodapé
        const allH4 = document.querySelectorAll('footer h4, .editaliza-footer-refatorado h4');
        allH4.forEach(h4 => {
            const text = h4.textContent.trim().toLowerCase();
            if (text === 'plataforma' || text === 'recursos' || text === 'suporte') {
                h4.style.color = '#FFFFFF';
                h4.style.setProperty('color', '#FFFFFF', 'important');
            }
        });
    }
    
    // Executar imediatamente
    forceColors();
    
    // Executar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceColors);
    }
    
    // Executar após um pequeno delay para garantir que tudo carregou
    setTimeout(forceColors, 100);
    setTimeout(forceColors, 500);
    setTimeout(forceColors, 1000);
    
    // Observar mudanças no DOM
    const observer = new MutationObserver(forceColors);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
    });
})();