import { useTransition, animated } from "@react-spring/web";
import { useEffect, useState } from "react";

type Props<A> = {
  elementWidth?: number;
  elementHeight?: number;
  maxWidth: number;
  items: A[]; //Prérequis : les items doivent avoir un attribut 'id' qui servira de clef
  itemsRenderFunction: React.FC<A>;
};
export function ReorderingList<A>({
  items,
  maxWidth,
  itemsRenderFunction: ItemsRenderFC,
  elementWidth = 100,
  elementHeight = 100,
}: Props<A>) {
  const rowMaxLength = Math.floor(maxWidth / elementWidth);

  const [renderChampionAmount, setRenderChampionAmount] = useState(
    items.length
  );
  const [isHeightAnimation, setIsHeightAnimation] = useState(false);
  const [height, setHeight] = useState(
    Math.floor(items.length / rowMaxLength) * elementHeight + elementHeight
  );

  useEffect(() => {
    setIsHeightAnimation(items.length < renderChampionAmount);
    setRenderChampionAmount(items.length);
    //Utilisation d'un state pour render la height après le premier render (sinon bande noire)
    setHeight(
      Math.floor(items.length / rowMaxLength) * elementHeight + elementHeight
    );
  }, [elementHeight, items.length, renderChampionAmount, rowMaxLength]);

  const transitions = useTransition(
    items.map((data, index) => {
      const column = index % rowMaxLength;
      const line = Math.floor(index / rowMaxLength);

      return {
        ...data,
        x: column * elementWidth,
        y: line * elementHeight,
      };
    }),
    {
      key: (item: any) => item.id,
      from: { opacity: 0 },
      leave: { opacity: 0 },
      config: { duration: 500 },
      enter: ({ x, y }) => ({ x, y, opacity: 1 }),
      update: ({ x, y }) => ({ x, y }),
    }
  );

  return (
    <div
      style={{
        position: "relative",
        width: maxWidth,
        height: height,
        transitionDelay: isHeightAnimation ? "500ms" : "0s",
        transitionDuration: isHeightAnimation ? "1s" : "0s",
      }}
    >
      {transitions((style, item, t, index) => {
        return (
          <animated.div
            style={{
              position: "absolute",
              ...style,
              zIndex: items.length - index,
            }}
          >
            <ItemsRenderFC {...item} />
          </animated.div>
        );
      })}
    </div>
  );
}
