'use client';

const steps = [
    {
        id: '01',
        title: 'Connect',
        description: 'Link your Solana wallet securely.'
    },
    {
        id: '02',
        title: 'Transact',
        description: 'Send instant P2P payments off-chain.'
    },
    {
        id: '03',
        title: 'Settle',
        description: 'Finalize on-chain when ready.'
    }
];

const HowItWorks = () => {
    return (
        <section className="py-32 px-6 md:px-12 bg-white text-black">
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-24">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Workflow</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black pt-12">
                    {steps.map((step, index) => (
                        <div key={index} className="group cursor-default">
                            <span className="block text-sm font-bold mb-4 text-[#ff0000] tracking-widest">STEP {step.id}</span>
                            <h3 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter group-hover:text-[#ff0000] transition-colors duration-300">
                                {step.title}
                            </h3>
                            <p className="text-xl text-gray-600 font-medium max-w-xs">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
