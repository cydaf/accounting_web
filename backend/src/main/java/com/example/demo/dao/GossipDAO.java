package com.example.demo.dao;

import java.util.List;
import com.example.demo.entity.Gossip;

public interface GossipDAO {

public List<Gossip> findAll(int user_id);

public Gossip findOne(int gossip_id);

public List<Gossip> showArchieve(int user_id);

public List<Gossip> showPersonal(int user_id);

public int insert(Gossip gossip);

public int update(Gossip gossip);

public int delete(int gossip_id);

}