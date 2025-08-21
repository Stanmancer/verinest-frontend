import VerinestLogo from "/assets/verinestlogo.svg";
import CustomButton from "../components/CustomButton";
import { CustomCard, CustomCardContent } from "../components/CustomCard";
import house1 from "/assets/house1.svg";
import house2 from "/assets/house2.svg";
import house3 from "/assets/house3.svg";
import quote from "/assets/quote.svg";
import telegram from "/assets/telegram.svg";
import github from "/assets/github.svg";
import discord from "/assets/discord.svg";
import twitter from "/assets/twitter.svg"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <img src={VerinestLogo} alt="verinestlogo.svg" />
        <CustomButton variant="primary">Get Started</CustomButton>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-slate-900 leading-tight">
              Africa's Real Estate.
              <br />
              Verified by Code
            </h1>
            <p className="text-lg text-slate-600 max-w-md">
              A blockchain-powered platform for buying, selling and verifying
              property in Nigeria and beyond.
            </p>
            <CustomButton
              variant="primary"
              className="bg-red-600 hover:bg-red-700"
            >
              <span className="text-lg"></span>
              Get Started
            </CustomButton>
          </div>
          <div className="flex gap-4 md:gap-6">
            <img src={house1} alt="house1.svg" className="h-auto " />

            <div className="flex-col w-full">
              <img
                src={house2}
                alt="house2.svg"
                className="bottom-0 right-[50px] h-auto"
              />

              <img src={house3} alt="house3.svg" className="h-auto mt-8 " />
            </div>
          </div>
        </div>
      </section>

      {/* How VeriNest Works */}
      <section className="bg-slate-800 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">
            How VeriNest Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <CustomCard variant="white">
              <CustomCardContent>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  Buyer Flow
                </h3>
                <ol className="space-y-2 text-slate-600">
                  <li>1. Browse verified properties</li>
                  <li>2. Pay with Naira or VERN</li>
                  <li>3. Get legally validated ownership</li>
                </ol>
              </CustomCardContent>
            </CustomCard>

            <CustomCard variant="white">
              <CustomCardContent>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  Landlord Flow
                </h3>
                <ol className="space-y-2 text-slate-600">
                  <li>1. Upload property</li>
                  <li>2. Verified by agent + lawyer</li>
                  <li>3. Get paid after escrow clears</li>
                </ol>
              </CustomCardContent>
            </CustomCard>

            <CustomCard variant="white">
              <CustomCardContent>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  Worker Flow
                </h3>
                <ol className="space-y-2 text-slate-600">
                  <li>1. Apply for verified jobs</li>
                  <li>2. Get matched by skill & location</li>
                  <li>3. Earn VERN instantly</li>
                </ol>
              </CustomCardContent>
            </CustomCard>
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">
          Powered by the VERN token
        </h2>
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <CustomCard variant="dark">
            <CustomCardContent className="text-center">
              <h3 className="text-lg font-semibold mb-2">Phase 1</h3>
              <p className="text-sm text-slate-300 mb-1">MVP Launch</p>
              <p className="text-sm text-slate-300 mb-1">Wallet connect</p>
              <p className="text-sm text-slate-300 mb-1">
                listings, Verification
              </p>
            </CustomCardContent>
          </CustomCard>

          <CustomCard variant="dark">
            <CustomCardContent className="text-center">
              <h3 className="text-lg font-semibold mb-2">Phase 2</h3>
              <p className="text-sm text-slate-300 mb-1">Labor & Escrow</p>
              <p className="text-sm text-slate-300 mb-1">Worker jobs, GPS</p>
              <p className="text-sm text-slate-300 mb-1">
                smart contract escrow
              </p>
            </CustomCardContent>
          </CustomCard>

          <CustomCard variant="dark">
            <CustomCardContent className="text-center">
              <h3 className="text-lg font-semibold mb-2">Phase 3</h3>
              <p className="text-sm text-slate-300 mb-1">DAO & Moderation</p>
              <p className="text-sm text-slate-300 mb-1">Community voting</p>
              <p className="text-sm text-slate-300 mb-1">staking, governance</p>
            </CustomCardContent>
          </CustomCard>

          <CustomCard variant="dark">
            <CustomCardContent className="text-center">
              <h3 className="text-lg font-semibold mb-2">Phase 4</h3>
              <p className="text-sm text-slate-300 mb-1">Scale Across Africa</p>
              <p className="text-sm text-slate-300 mb-1">Legal integrations</p>
              <p className="text-sm text-slate-300 mb-1">more cities</p>
            </CustomCardContent>
          </CustomCard>
        </div>
        <div className="flex gap-4">
          <CustomButton variant="primary">View Full Tokenomics</CustomButton>
          <CustomButton variant="outline">Explore</CustomButton>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <blockquote className="text-2xl text-slate-700 italic flex items-start space-x-1">
              <img src={quote} alt="" />
              <span> I sold my land through VeriNest and it was seamless</span>
            </blockquote>
            <blockquote className="text-2xl text-slate-700 italic flex items-start space-x-1">
              <img src={quote} alt="" />
              <p> Got paid for my work in crypto. Fast and clean.</p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Join the VeriNest Movement
            </h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <img src={VerinestLogo} alt="" />
              
            </div>
            <div className="flex flex-wrap gap-6 text-slate-600">
              <a href="#" className="hover:text-slate-800">
                Features
              </a>
              <a href="#" className="hover:text-slate-800">
                How it works
              </a>
              <a href="#" className="hover:text-slate-800">
                Contact Us
              </a>
              <a href="#" className="hover:text-slate-800">
                Terms of Service
              </a>
              <a href="#" className="hover:text-slate-800">
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-slate-200">
  <div className="flex gap-4">
    <a href="https://twitter.com"  rel="">
      <img src={twitter} alt="Twitter" className="w-6 h-6 hover:opacity-80 transition" />
    </a>
    <a href="$" rel="">
      <img src={github} alt="GitHub" className="w-6 h-6 hover:opacity-80 transition" />
    </a>
    <a href="https://t.me" rel= "">
      <img src={telegram} alt="Telegram" className="w-6 h-6 hover:opacity-80 transition" />
    </a>
    <a href="https://discord.com" rel="">
      <img src={discord} alt="Discord" className="w-6 h-6 hover:opacity-80 transition" />
    </a>
  </div>

  <p className="text-slate-500 text-sm">© copyright 2025</p>
</div>

        </div>
      </footer>
    </div>
  );
}
