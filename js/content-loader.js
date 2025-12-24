// Content Loader - Loads portfolio data from JSON files
// This makes your portfolio content editable through Netlify CMS

async function loadPortfolioContent() {
    try {
        const portfolioResponse = await fetch('/content/portfolio.json');
        const portfolio = await portfolioResponse.json();
        
        const themeResponse = await fetch('/content/theme.json');
        const theme = await themeResponse.json();
        
        applyContent(portfolio);
        applyTheme(theme);
        
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

function applyContent(data) {
    if (data.title) {
        const h1 = document.querySelector('h1');
        if (h1) h1.textContent = data.title;
        document.title = data.title;
    }
    
    if (data.intro) {
        const introDiv = document.querySelector('.intro');
        if (introDiv) {
            introDiv.innerHTML = '';
            
            if (data.intro.greeting) {
                introDiv.innerHTML += `<p>${data.intro.greeting}</p>`;
            }
            if (data.intro.description) {
                introDiv.innerHTML += `<p>${data.intro.description}</p>`;
            }
            if (data.intro.pronouns) {
                introDiv.innerHTML += `<p>My pronouns are ${data.intro.pronouns}.</p>`;
            }
            if (data.intro.skills && data.intro.skills.length > 0) {
                data.intro.skills.forEach(skill => {
                    introDiv.innerHTML += `<p>${skill}</p>`;
                });
            }
            if (data.intro.personal_note) {
                introDiv.innerHTML += `<p>${data.intro.personal_note}</p>`;
            }
        }
    }
    
    if (data.featured_links && data.featured_links.length > 0) {
        const buttonGroup = document.querySelector('.button-group');
        if (buttonGroup) {
            buttonGroup.innerHTML = '';
            
            data.featured_links.forEach(link => {
                const styleClass = link.style === 'secondary' ? 'space-btn secondary' : 'space-btn';
                buttonGroup.innerHTML += `
                    <a href="${link.url}" class="${styleClass}" target="_blank" rel="noopener">
                        <span>${link.text}</span>
                    </a>
                `;
            });
        }
    }
    
    if (data.staff_positions && data.staff_positions.length > 0) {
        const sections = document.querySelectorAll('.section');
        const staffSection = sections[0];
        
        if (staffSection) {
            const existingCards = staffSection.querySelectorAll('.feature-card');
            existingCards.forEach(card => card.remove());
            
            data.staff_positions.forEach(position => {
                const card = document.createElement('div');
                card.className = 'feature-card';
                card.innerHTML = `
                    <h3>${position.title} - ${position.organization}</h3>
                    <p>${position.description}</p>
                    <a href="${position.link}" target="_blank" rel="noopener">${position.link_text}</a>
                `;
                staffSection.appendChild(card);
            });
        }
    }
    
    if (data.occupation) {
        const sections = document.querySelectorAll('.section');
        const occupationSection = sections[1];
        
        if (occupationSection) {
            const card = occupationSection.querySelector('.feature-card');
            if (card) {
                card.innerHTML = `
                    <h3>${data.occupation.title}</h3>
                    <p>${data.occupation.description}</p>
                    <a href="${data.occupation.link}" target="_blank" rel="noopener">${data.occupation.link_text}</a>
                `;
            }
        }
    }
    
    if (data.projects && data.projects.length > 0) {
        const sections = document.querySelectorAll('.section');
        const projectSection = sections[2];
        
        if (projectSection) {
            const existingCards = projectSection.querySelectorAll('.feature-card');
            existingCards.forEach(card => card.remove());
            
            data.projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'feature-card';
                card.innerHTML = `
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank" rel="noopener">${project.link_text}</a>
                `;
                projectSection.appendChild(card);
            });
        }
    }
    
    if (data.server_experience && data.server_experience.length > 0) {
        const serversGrid = document.querySelector('.servers-grid');
        if (serversGrid) {
            serversGrid.innerHTML = '';
            
            const midpoint = Math.ceil(data.server_experience.length / 2);
            const firstColumn = data.server_experience.slice(0, midpoint);
            const secondColumn = data.server_experience.slice(midpoint);
            
            const list1 = document.createElement('ul');
            list1.className = 'list';
            firstColumn.forEach(server => {
                list1.innerHTML += `<li>${server.server} - ${server.position}</li>`;
            });
            serversGrid.appendChild(list1);
            
            const list2 = document.createElement('ul');
            list2.className = 'list';
            secondColumn.forEach(server => {
                list2.innerHTML += `<li>${server.server} - ${server.position}</li>`;
            });
            serversGrid.appendChild(list2);
        }
    }
    
    if (data.social_media) {
        const socialLinks = document.querySelector('.social-links');
        if (socialLinks) {
            socialLinks.innerHTML = '';
            
            if (data.social_media.twitter) {
                socialLinks.innerHTML += `
                    <a href="${data.social_media.twitter}" class="social-icon" target="_blank" rel="noopener" aria-label="Twitter">
                        <div class="icon-twitter"></div>
                    </a>
                `;
            }
            if (data.social_media.tiktok) {
                socialLinks.innerHTML += `
                    <a href="${data.social_media.tiktok}" class="social-icon" target="_blank" rel="noopener" aria-label="TikTok">
                        <div class="icon-tiktok"></div>
                    </a>
                `;
            }
            if (data.social_media.instagram) {
                socialLinks.innerHTML += `
                    <a href="${data.social_media.instagram}" class="social-icon" target="_blank" rel="noopener" aria-label="Instagram">
                        <div class="icon-instagram"></div>
                    </a>
                `;
            }
            if (data.social_media.email) {
                socialLinks.innerHTML += `
                    <a href="mailto:${data.social_media.email}" class="social-icon" target="_blank" rel="noopener" aria-label="Email">
                        <div class="icon-email"></div>
                    </a>
                `;
            }
            if (data.social_media.discord) {
                socialLinks.innerHTML += `
                    <a href="${data.social_media.discord}" class="social-icon" target="_blank" rel="noopener" aria-label="Discord">
                        <div class="icon-discord"></div>
                    </a>
                `;
            }
        }
    }
    
    if (data.footer) {
        const footerP = document.querySelector('.footer p');
        if (footerP) footerP.textContent = data.footer;
    }
}

function applyTheme(theme) {
    if (!theme || !theme.colors) return;
    
    const root = document.documentElement;
    if (theme.colors.primary) root.style.setProperty('--cyan-glow', theme.colors.primary);
    if (theme.colors.secondary) root.style.setProperty('--nebula-pink', theme.colors.secondary);
    if (theme.colors.accent) root.style.setProperty('--orange-glow', theme.colors.accent);
    if (theme.colors.bg_dark) root.style.setProperty('--space-dark', theme.colors.bg_dark);
    if (theme.colors.bg_blue) root.style.setProperty('--space-blue', theme.colors.bg_blue);
    
    if (theme.seo) {
        if (theme.seo.title) {
            document.title = theme.seo.title;
        }
        if (theme.seo.description) {
            let metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', theme.seo.description);
            }
        }
    }
    
    if (theme.effects) {
        window.themeEffects = theme.effects;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPortfolioContent);
} else {
    loadPortfolioContent();
}