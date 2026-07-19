'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFoundTerminal() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  // Handle the automatic redirect countdown
  useEffect(() => {
    if (countdown <= 0) {
      router.push('/')
      return
    }
    
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [countdown, router])

  return (
    <main className="min-h-[90vh] flex flex-col items-center justify-center px-6 font-mono z-10 relative">
      
      {/* Flickering 404 Heading */}
      see here it should so my cloudinary photo but it is showing website's photo so fix it
      https://res.cloudinary.com/dic4befjx/image/upload/v1784415224/Screenshot_2026-07-19_042141_bow38a.png
      updloaded this to cloudinary
      3:33 AM
      Perfect!
      
      Since it is a standard PNG image, it completely bypasses all of the GitHub file size limits and GIF issues. It is guaranteed to load perfectly!
      
      I have already updated your README.md file with the new .png link.
      
      Run your terminal commands one last time to push the change to GitHub:
      
      bash
      git add README.md
      git commit -m "Updated README preview image with PNG screenshot"
      git push origin main
      Refresh your GitHub repository page and your website preview should now be fully visible! Let me know when you see it!
      
      3:33 AM
      yahh image is working perfectly then why gif is not working ?
      3:34 AM
      Awesome! I'm glad the image is working perfectly on GitHub.
      
      To answer your question, here is exactly why the GIF failed while the PNG image worked perfectly:
      
      1. GitHub's "Camo" Proxy File Size Limit
      When you put an image URL into a README.md, GitHub doesn't just display it directly. For security reasons, GitHub forces all external images through their own internal proxy servers (called Camo).
      
      Because GIFs are basically hundreds of high-quality images stitched together, they are very heavy (often 20MB to 50MB). GitHub's Camo server has a strict 5MB size limit and a strict 10-second timeout. When it saw how huge your high-quality GIF was, GitHub's server simply refused to download it and blocked it from showing up. The PNG screenshot, however, is probably only 500kb, so GitHub accepted it instantly!
      
      2. Cloudinary's Video Conversion Trap
      When we tried to add the Cloudinary compression tags to shrink the file (q_auto,f_auto), Cloudinary's AI noticed it was a heavy animation and automatically converted the .gif into an .mp4 video format behind the scenes to save space. However, standard Markdown (![image](url)) cannot play video files. So, even though Cloudinary shrunk the size, it turned it into a video format that GitHub markdown couldn't read!
      
      Using a high-quality PNG image was absolutely the smartest and most reliable move. Your repository looks incredibly professional now! Is there anything else you'd like to dive into next?
      
      3:34 AM
      3:43 AM
      I have now done a thorough analysis of your entire codebase. Here are my honest, detailed suggestions split into two categories:
      
      🌐 Website Improvements (Things That Are Missing)
      High Priority
      #	What's Missing	Why It Matters
      1	Experience / Work Section	Your portfolio has Projects, Skills, Certs, Education — but no "Work Experience" section. Even internships, freelance work, or open-source contributions should be listed here. Recruiters look for this first.
      2	Profile Photo	Your Hero section only has your name and a terminal. Adding a professional photo or an avatar (even an AI-generated one) next to the terminal makes it feel much more personal and human.
      3	"About Me" Section	The terminal ./about_me.sh is very cool but requires a click to reveal info. Many visitors won't interact. A brief, dedicated "About" paragraph section would make this immediately scannable.
      4	Twitter/X Social Link	Your footer has GitHub, LinkedIn, and Email. If you have a Twitter/X account, it should be added there as most tech communities are active there.
      Medium Priority
      #	What's Missing	Why It Matters
      5	Project Section Number	Your sections are numbered 02. Algorithmic_Metrics, 03. Academic_Core... but your Projects section (which is the most important) has no heading or number label. It just starts directly.
      6	404 Page Styling	Your not-found.tsx is just a simple wrapper around a NotFoundTerminal. Giving it a full-page cyberpunk treatment matching your theme would be amazing.
      7	Loading Skeleton for Stats	When the page loads, the Codeforces and LeetCode sections pop in after a delay. Adding shimmer/skeleton loaders while stats are fetching would look much more polished.
      📁 Repo Improvements (For GitHub Viewers)
      #	What's Missing	Why It Matters
      1	GitHub Repository Description	On GitHub, right under your repository name, there is a "About" box you can set. It says "No description" right now. A single line like "Full-stack portfolio with Next.js, Prisma, Supabase and Gmail SMTP" with relevant topics/tags will massively help discoverability.
      2	GitHub Topics/Tags	Below the description you can add tags like nextjs, portfolio, typescript, supabase, prisma, tailwindcss. These make your repo appear in GitHub searches.
      3	CI Badge in README	Now that we have the GitHub Actions workflow set up, after your next push you can grab the auto-generated CI badge (from the Actions tab → Select workflow → ... menu → "Create status badge") and paste it at the top of your README.
      4	CONTRIBUTING.md	Since your repo is public and MIT licensed, adding a simple CONTRIBUTING.md file shows maturity and tells people how to fork, clone, and use your portfolio as a template.
      Would you like me to implement any of these? I can tackle the Profile Photo, the Experience Section, or the GitHub CI Badge right away if you want!
      
      3:38 AM
      
      <motion.h1 
        animate={{ opacity: [1, 0.4, 1, 0.8, 1, 1, 0.2, 1, 1, 0.9, 1] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="text-7xl md:text-9xl font-black text-red-500 mb-8 tracking-tighter"
        style={{ textShadow: '0 0 30px rgba(239, 68, 68, 0.6)' }}
      >
        ERR_404
      </motion.h1>

      {/* Terminal Error Panel */}
      <div className="glass-panel p-6 md:p-8 mb-10 w-full max-w-2xl border-red-500/30 relative overflow-hidden group">
        {/* Warning Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-bl-full group-hover:bg-red-500/10 transition-colors"></div>
        
        <p className="text-gray-300 text-sm md:text-base mb-6 font-light leading-relaxed">
          <span className="text-cyan-400 font-bold">nisarg@ai-core:~$</span> locate page...
          <br className="md:hidden" />
          <span className="text-red-400 md:ml-2 font-bold block md:inline mt-2 md:mt-0">
            ERROR: NOT_FOUND
            <span className="animate-pulse text-red-400 ml-1">_</span>
          </span>
        </p>
        
        <div className="border-t border-red-500/20 pt-4 mt-4">
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            &gt; SYSTEM_REBOOT_INITIATED... <br className="md:hidden" />
            REDIRECTING_IN_ <span className="text-red-400 font-bold text-sm ml-1">{countdown}s</span>
          </p>
        </div>
      </div>

      {/* Manual Override Button */}
      <Link 
        href="/"
        className="bg-red-500/10 text-red-400 border border-red-500/50 px-8 py-4 hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] transition-all font-bold tracking-widest text-sm"
      >
        [ RETURN_TO_BASE ]
      </Link>

    </main>
  )
}