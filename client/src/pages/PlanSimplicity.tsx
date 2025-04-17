import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Free Forever',
    price: 'Free',
    features: [
      'Unlimited journaling',
      'Private by default',
      'Basic themes',
    ],
    gradient: 'from-[#d9afd9] to-[#97d9e1]',
  },
  {
    name: 'Supporter',
    price: '$4.99/mo',
    features: [
      'All Free features',
      'Custom themes & moods',
      'Streak boosts',
      'Early feature access',
    ],
    gradient: 'from-[#f6d365] to-[#fda085]',
    highlight: true,
  },
];

export const PlanSimplicity = () => {
  return (
    <section className="w-full bg-gradient-to-br from-[#f9f9fb] to-[#eef2f3] py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-semibold text-gray-800 mb-6"
        >
          Just write. We’ll take care of the rest.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-gray-500 text-lg md:text-xl mb-12"
        >
          Whether you're journaling for clarity or just passing thoughts — there's a plan that lets you be you.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className={`rounded-3xl p-8 shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br ${plan.gradient} ${
                plan.highlight ? 'ring-2 ring-offset-2 ring-orange-300' : ''
              }`}
            >
              <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
              <p className="text-white text-xl mb-6">{plan.price}</p>
              <ul className="text-white space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-sm md:text-base">• {feature}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
